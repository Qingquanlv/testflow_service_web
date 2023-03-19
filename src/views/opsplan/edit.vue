<template>
  <span>
      <el-button type="primary" size="small" @click="onShow"> {{ op == 'add' ? '新增' : '编辑'}}</el-button>
      <el-dialog
        title="新增/编辑流程"
        fullscreen
        @closed="$emit('reload')"
        :visible.sync="show">
            <div style="margin-bottom:2px">
                TestPlan名称：<el-input v-model="testPlanName" style="width:300px;margin-right:10px" size="small" placeholder="请输入Plan名称"></el-input>
                TestPlan描述：<el-input v-model="description" style="width:450px" size="small" placeholder="请输入Plan描述"></el-input>
            </div>
            <div id="wfd-app">
                <el-button type="primary" size="small" style="float:right;margin-top:6px;margin-right:6px;" @click="onSave">保存</el-button>
                <wfd-vue ref="wfd" :wfdData="testPlan" style="height:100%" lang="zh" />
            </div>
      </el-dialog>
  </span>
</template>


<script>
import { deepCopy, uuid } from '@/utils/CommonUtil'
import WfdVue from '@/components/OpsFlowChart'
import { getById, create } from '@/api/ops'
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
      testPlanName:'',
      description:'',
      testPlan:{
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
        if(this.row.testPlanId){
            getById(this.row.testPlanId).then(resp => {
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
                this.testPlan = resp
                this.testPlanName = resp.testPlanName
                this.description = resp.description
            })
        } else {
            this.testPlanName = ''
            this.description = ''
            this.testPlan.nodes = []
            this.testPlan.edges = []
        }
    },
    onSave(){
        let data = this.$refs['wfd'].graph.save()
        let req = {}
        req.requestId = uuid()
        req.testPlanId = this.testPlan.testPlanId
        req.testPlanName = this.testPlanName
        req.description = this.description
        req.nodes = data.nodes.map(item => {
            return {
                "x": item.x,
                "y": item.y,
                "label": item.label,
                "clazz": item.clazz
            }
        })
        console.log(data)
        req.edges = data.edges.map(item => {
            return {
                "source": data.nodes.filter(x => x.id == item.source)[0] ? data.nodes.filter(x => x.id == item.source)[0].label : '',
                "target": data.nodes.filter(x => x.id == item.target)[0] ? data.nodes.filter(x => x.id == item.target)[0].label : '',
                "sourceAnchor": item.sourceAnchor,
                "targetAnchor": item.targetAnchor,
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
                message: resp.status && resp.status.success ? '保存成功' : '保存失败: ' + resp.status.message,
                type: resp.status && resp.status.success ? 'success' : 'error'
            });
            if ('success' === resp.status.success) {
                this.row.testPlanId = resp.testPlanId
                this.onShow()
            }
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