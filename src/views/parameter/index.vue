<template>
    <div>
        <el-row :gutter="5">
            <el-col :span="6">
                <el-card class="box-card">
                    <c-tree title="参数列表" :showAddRootBtn="true" @onNodeClick="onNodeClick" :data="resTreeData" @onTreeRefresh="onTreeRefresh" @onNodeDelete="onNodeDelete"></c-tree>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card class="box-card" v-if="this.item && this.item.parentId >= 0">
                  <div>
                    <span>参数配置</span>
                    <hr/>
                    <div>
                      <el-form :model="item" size="small" ref="editFrom" label-width="90px" >
                        <el-form-item label="参数名称" prop="name" verify class="is-required">
                          <el-input v-model="item.name"></el-input>
                        </el-form-item>
                      </el-form>
                      <el-button v-if="false" type="primary" size="mini" icon="el-icon-finished" style="margin: 0 0 3px 20px" @click="doFormat()">格式化</el-button>
                      <div style="width:100%;height:500px;padding:0 0 20px 20px;">
                        <MonacoEditor
                            theme="vs-dark"
                            language="typescript"
                            :options="options"
                            @change="onChange"
                            :value="warpCode" >
                        </MonacoEditor>
                      </div>
                      <el-row>
                        <el-col :span="4" :offset="20">
                          <el-button type="primary" size="small" icon="el-icon-document" @click="doSave()">保存</el-button>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import { deepCopy, uuid } from '@/utils/CommonUtil'
import MonacoEditor from '@/components/MonacoEditor.vue';
import { queryAll, deleteByName, update } from '@/api/parameter'
const jsonFormat = require('json-format');

export default {
  data() {
    return {
        item : {},
        resTreeData : [],
        script:'[]',
        options: {
            //Monaco Editor Options
        }
    }
  },
  created() {
      this.initResTree()
  },
  components: {
    MonacoEditor
  },
  watch:{
    item(nv){
      this.script = this.item.parameters
    }
  },
  computed:{
    warpCode(){
      return jsonFormat(this.script)
    }
  },
  methods : {
      initResTree(){
        queryAll({}).then((data) => {
            let i = 0
            this.resTreeData = data.parameters.map(x => {
              return {
                ...x,
                id: i++,
                parentId:0,
                label: x.parameter_name,
                name: x.parameter_name
              }
            })
        }).catch(() =>{
            this.$message({
                type: 'error',
                message: '请求失败!'
            })
        })
      },
      onTreeRefresh(){
        this.initResTree()
      },
      onNodeClick(data, node){
        data.show = data.show
        data.keepAlive = data.keepAlive
        data.target = data.target || 'tab'
        this.item = deepCopy(data)
      },
      onNodeDelete(node, data){
        if(!data || (data.children && data.children.length > 0)){
            this.$message({
                type: 'error',
                message: '该节点存在子节点,不可直接删除!'
            })
            this.initResTree()
        } else {
            deleteByName({name:data.name}).then((resp) =>{
                this.$message({
                    type: resp.status.success ? 'success' : 'error',
                    message: resp.status.success ? '删除成功' : `[${resp.errorCode}]:[${resp.status.message}]:删除失败!`
                })
                this.initResTree()
            })
        }
      },
      onChange(value) {
        if(value){
          try {
            this.item.parameters = JSON.parse(value || '[]')
          } catch (error) {
          }
        }
      },
      doFormat(){
        this.script = deepCopy(this.item.parameters)
      },
      doSave(){
          let req = {
              requestId: uuid(),
              parameter_name: this.item.name,
              parameters: this.item.parameters || []
          }
          update(req).then(resp => {
              this.$message({
                  type: resp.status.success ? 'success' : 'error',
                  message: resp.status.success ? '保存成功' : `[${resp.errorCode}]:[${resp.status.message}]:保存失败!`
              })
              this.initResTree()
          })
      },
  }
}
</script>

<style>
  .box-card {
    width: 100%;
  }
</style>
