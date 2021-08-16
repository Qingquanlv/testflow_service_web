<template>
  <span>
      <el-button type="primary" size="small" @click="onShow"> {{ op == 'add' ? '新增' : '编辑'}}</el-button>
      <el-dialog
        title="新增/编辑流程"
        fullscreen
        @closed="$emit('reload')"
        :visible.sync="show">
            <div style="margin-bottom:2px">
                Feature名称：<el-input v-model="feature.featureName" style="width:300px;margin-right:10px" size="small" placeholder="请输入Feature名称"></el-input>
                Feature描述：<el-input v-model="feature.description" style="width:450px" size="small" placeholder="请输入Feature描述"></el-input>
            </div>
            <div id="wfd-app">
                <el-button type="primary" size="small" style="float:right;margin-top:6px;margin-right:6px;" @click="onSave">保存</el-button>
                <wfd-vue ref="wfd" :wfdData="feature" style="height:100%" lang="zh" />
            </div>
      </el-dialog>
  </span>
</template>


<script>
import { deepCopy, uuid } from '@/utils/CommonUtil'
import WfdVue from '@/components/Wfd'
import { getById, create } from '@/api/feature'
export default {
  name: 'wfd-app',
  components:{
    WfdVue
  },
  props:{
      op: {
          type:String,
          default: () => {
              return 'add'
          }
      },
      row:{
          type: Object,
          default: () => {
              return {}
          }
      }
  },
  data () {
    return {
      show: false,
      feature:{
        nodes:[],
        edges:[]
      }
    }
  },
  mounted() {
  },
  methods:{
    onShow(){
        this.show = true
        if(this.row.feature_id){
            getById(this.row.feature_id).then(resp => {
                resp.nodes = resp.nodes.map(item => {
                    return {
                        id:`${item.id}`,
                        clazz: item.clazz,
                        label: item.label,
                        x: item.x,
                        y: item.y,
                        exec_params: resp.config.filter(x => x.id == item.id)[0] ? resp.config.filter(x => x.id == item.id)[0].exec_params : {}
                    }
                })
                this.feature = resp
            })
        } else {
            this.feature.nodes = []
            this.feature.edges = []
        }
    },
    onSave(){
        let data = this.$refs['wfd'].graph.save()
        let req = {}
        req.requestId = uuid()
        req.featureId = this.feature.featureId
        req.featureName = this.feature.featureName
        req.description = this.feature.description
        req.nodes = data.nodes.map(item => {
            return {
                "x": item.x,
                "y": item.y,
                "label": item.label,
                "clazz": item.clazz
            }
        })
        req.edges = data.edges.map(item => {
            return {
                "source": data.nodes.filter(x => x.id == item.source)[0] ? data.nodes.filter(x => x.id == item.source)[0].label : '',
                "target": data.nodes.filter(x => x.id == item.target)[0] ? data.nodes.filter(x => x.id == item.target)[0].label : '',
                "sourceAnchor": 1,
                "targetAnchor": 3
            }
        })
        req.config = data.nodes.map(item => {
            return {
                "label": item.label,
                "exec_params": item.exec_params || {}
            }
        })
        create(req).then(resp => {
            this.$message({
                message: resp.status && resp.status.success ? '保存成功' : '保存失败',
                type: resp.status && resp.status.success ? 'success' : 'error'
            });
            this.onShow()
        })
    }
  }
}
</script>

<style>
#wfd-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-dialog__body{
    padding: 0px 20px !important;
}
</style>