<template>
    <el-scrollbar style="height:300px;"> 
      <el-dialog
            title="对比结果"
            :visible.sync="innerVisible">
            <div>Case Status:</div>
            <span v-if="result.status == 0" style="color:red">失败</span>
            <span v-if="result.status == 1" style="color:green">成功</span>
            <div>Case Name:</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="result.label" />
            <div>Case Type:</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="result.clazz" />
            <div class="panelRow">
                <div>Case Config:</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="result.config"
                    type="textarea"/>
            </div> 
            <div class="panelRow">
                <div>Assertion:</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="result.data"
                    type="textarea"/>
            </div>        
            <div class="panelRow">  
                <div>Comparison:</div>     
                <monaco-editor style="width:90%;height:300px;"
                    language="json"
                    theme="vs"
                    :diffEditor="diff"
                    value=""
                    ref="monaco">
                </monaco-editor>
            </div>
      </el-dialog>
    </el-scrollbar>
</template>

<script>
import { taskCaseResult } from '@/api/job'
import MonacoEditor from '@/components/MonacoEditor.vue';

export default {
  name: 'CompareObjResultDia',
  components:{ MonacoEditor },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    readOnly:{
      type: Boolean,
      default: false,
    },
    diff:{
      type: Boolean,
      default: true,
    }
  },
  data () {
    return {
        result:{},
        innerVisible: this.visible
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val === oldVal) {
        return
      }
      this.innerVisible = val
    },
    innerVisible(val, oldVal) {
      if (val === oldVal) {
        return
      }
      this.$emit('update:visible', val)
    }
  },
  created () {
    this.init()
  },
  updated() {
    this.init()  
    this.dVisible = this.dialogFormVisible
  },
  methods: {
    init () {
        console.log(2)
    },
    getResulte(id, index){
        let req = {
            "resultIndexId": index,
            "taskResultId": id
        }
        taskCaseResult(req).then(res => {
            this.result = res
            let data = JSON.parse(res.config)
            let a = {
              "expKey": data.expKey,
              "atlKey": data.atlKey,
              "primaryKey": data.primaryKey,
              "noCompareItem": data.noCompareItem,
              "threshold": data.threshold          
            }
            this.result.config = JSON.stringify(a)
            this.$refs.monaco._setModel(JSON.stringify(data.atlValue, null, '\t'), JSON.stringify(data.expValue, null, '\t'))
        })
        
        
    },
    getVal () {
        return this.monaco.getValue()
        }
    }
}
</script>

<style>
    .el-scrollbar__wrap {
        overflow-x: hidden!important;
    }
</style>

