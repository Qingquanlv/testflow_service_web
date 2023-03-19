<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['CompareObj']}}</div>
        <div class="panelBody">
            <TestFlowDefault :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>Feature Id</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    :disabled="readOnly"
                    v-model="params.featureId" />
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
                expObj: (this.model.featureId && this.model.exec_params.featureId) || ''
            }
            return paramCopy
        },
    }
  }
</script>