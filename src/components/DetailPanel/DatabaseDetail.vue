<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['database']}}</div>
        <div class="panelBody">
            <TestFlowDefault :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <h3>SQL语句</h3>
                <MonacoEditor style="width:100%;height:200px;"
                    language="sql"
                    theme="vs-dark"
                    @change="sqlChange"
                    :value="initsql"
                    ref="sqlEditor">
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
          initsql: this.model.exec_params.sql_str
      }
    },
    watch:{
    },
    methods: {
      sqlChange(val){
        this.onChange('exec_params', {sql_str : val})
      }
    }
  }
</script>
