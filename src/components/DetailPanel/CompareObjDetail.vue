<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['CompareObj']}}</div>
        <div class="panelBody">
            <TestFlowDefault :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>期望对象</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.expObj" />
                <div>实际对象</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.atlObj" />
                <div>对比主键</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.pkMap" />
                <div>忽略字段</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.noCompareItemMap" />
                <div>阈值对比</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.thresholdMap" />    
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
                expObj: (this.model.exec_params && this.model.exec_params.expObj) || '',
                atlObj: (this.model.exec_params && this.model.exec_params.atlObj) || '',
                pkMap: (this.model.exec_params && this.model.exec_params.pkMap) || '',
                noCompareItemMap: (this.model.exec_params && this.model.exec_params.noCompareItemMap) || '',
                thresholdMap: (this.model.exec_params && this.model.exec_params.thresholdMap) || ''
            }
            return paramCopy
        },
    }
  }
</script>