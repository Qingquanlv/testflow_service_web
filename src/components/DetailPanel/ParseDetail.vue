<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['parse']}}</div>
        <div class="panelBody">
            <TestFlowDefault :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>方法参数：</div>
                <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        :value="params.parameters"
                        @input="(value) => {argsChange(value)}" />
            </div>
            <div class="panelRow">
                <div>Java代码段：</div>
                <MonacoEditor style="width:100%;height:200px;"
                    language="java"
                    theme="vs-dark"
                    @change="javaChange"
                    value=""
                    ref="javaEditor">
                </MonacoEditor>
            </div>
            <div class="panelRow">
                <ExecDefault :node="model" />
            </div>
        </div>
    </div>
</template>
<script>
  import MonacoEditor from '@/components/MonacoEditor.vue';
  import TestFlowDefault from './TestFlowDefault.vue'
  import ExecDefault from './ExecDefault.vue'
  export default {
    inject: ['i18n'],
    components:{
        TestFlowDefault,ExecDefault,MonacoEditor
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
        params : this.copyParams()
      }
    },
    watch:{
        params:{
            deep:true,
            handler(newVal){
                this.onChange('exec_params', newVal)
            }
        }
    },
    methods: {
        copyParams(){
            let data = {
                parameters: (this.model.exec_params && this.model.exec_params.parameters) || '',
                cvt_method_source: (this.model.exec_params && this.model.exec_params.cvt_method_source) || ''
            }
            this.$nextTick(() => {
                this.$refs.javaEditor && this.$refs.javaEditor._setValue(this.params.cvt_method_source)
            })
            return data
        },
        javaChange(value) {
            this.params.cvt_method_source = value
        },
        argsChange(val){
            this.params.parameters = val
        }
    }
  }
</script>
