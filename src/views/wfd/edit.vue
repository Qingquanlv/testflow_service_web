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
                <wfd-vue ref="wfd" :wfdData="feature" style="height:100%" :users="candidateUsers" :groups="candidateGroups" :categorys="categorys" lang="zh" />
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
      },
      candidateUsers: [{id:'1',name:'Tom'},{id:'2',name:'Steven'},{id:'3',name:'Andy'}],
      candidateGroups: [{id:'1',name:'Manager'},{id:'2',name:'Security'},{id:'3',name:'OA'}],
      categorys: [{id:'1',name:'Common'},{id:'2',name:'Subsidy'},{id:'3',name:'Maintain'}],
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
                        y: item.y
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
        this.feature.requestId = uuid();
        create(this.feature).then(resp => {
            this.$message({
                message: resp.status && resp.status.success ? '保存成功' : '保存失败',
                type: resp.status && resp.status.success ? 'success' : 'error'
            });
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