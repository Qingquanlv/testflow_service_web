<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['parse']}}</div>
        <div class="panelBody">
            <TestFlowDefault :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <h3>方法参数：</h3>
                <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        :value="initArgs"
                        @input="(value) => {argsChange(value)}" />
            </div>
            <div class="panelRow">
                <h3>Java代码段</h3>
                <MonacoEditor style="width:100%;height:200px;"
                    language="java"
                    theme="vs-dark"
                    @change="javaChange"
                    :value="initJava"
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
          initJava: this.model.exec_params.cvt_method_source,
          initArgs: this.cvtArgs()
      }
    },
    watch:{
    },
    methods: {
      cvtArgs(){
        let p = ''
        try{
          p = JSON.parse(this.model.exec_params.parameters).join(',')
        }catch(error){
          p = this.model.exec_params.parameters
        }
        let data = {
            cvt_method_source: this.model.exec_params.cvt_method_source,
            parameters: p
        }
        this.onChange('exec_params', data)
        return p
      },
      javaChange(val){
        let p = this.cvtArgs()
        let data = {
            cvt_method_source: val,
            parameters: p
        }
        this.onChange('exec_params', data)
      },
      argsChange(val){
        this.initArgs = val
        let data = {
            cvt_method_source: this.model.exec_params.cvt_method_source,
            parameters: val
        }
        this.onChange('exec_params', data)
      }
    }
  }
</script>
