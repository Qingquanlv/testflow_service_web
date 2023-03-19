<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['ConditionFor']}}</div>
        <div class="panelBody">
            <TestFlowDefault :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>对比Path</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.path" />
                <div>对比符号</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.operator" />
                <div>对比值</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.value" />
                <div>最多执行次数</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.maxLoop" />
                <div>执行等待时间</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.waitTime" />  
                <div>继续循环流转节点</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.loopNodeName" />   
                <div>跳出循环流转节点</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.nextNodeName" />                                 
            </div>
            <div class="panelRow">
                <ExecDefault :node="model" />
            </div>
        </div>
    </div>
</template>
<script>
  import TestFlowDefault from './TestFlowDefault.vue'
  import ExecDefault from './ExecDefault.vue'
  export default {
    inject: ['i18n'],
    components:{
        TestFlowDefault,ExecDefault
    },
    props: {
      model: {
        type:Object,
        default: ()=>({}),
      },
      onChange: {
        type: Function,
        default: ()=>{}
      },
      readOnly:{
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        params: this.copyParams()
      }
    },
    watch:{
        params:{
            deep:true,
            handler(newVal){
                this.onChange('exec_params', newVal)
            }
        },
    },
    methods: {
        copyParams(){
            let paramCopy = {
                path: (this.model.exec_params && this.model.exec_params.path) || '',
                operator: (this.model.exec_params && this.model.exec_params.operator) || '',
                value: (this.model.exec_params && this.model.exec_params.value) || '',
                maxLoop: (this.model.exec_params && this.model.exec_params.maxLoop) || '',
                waitTime: (this.model.exec_params && this.model.exec_params.waitTime) || '',
                loopNodeName: (this.model.exec_params && this.model.exec_params.loopNodeName) || '',
                nextNodeName: (this.model.exec_params && this.model.exec_params.nextNodeName) || ''
            }
            return paramCopy
        },
    }
  }
</script>