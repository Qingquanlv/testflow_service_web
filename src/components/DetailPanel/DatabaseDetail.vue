<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['database']}}</div>
        <div class="panelBody">
            <TestFlowDefault :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>环境：</div>
                <el-input size="small"
                    style="width:90%; font-size:12px"
                    v-model="env" />
            </div>
            <div class="panelRow">
                <div>SQL语句：</div>
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
          env: this.model.exec_params.env || '',
          initsql: this.model.exec_params.sql_str
      }
    },
    watch:{
      env(nv,ov){
        console.log(111)
        this.onChange('exec_params', {env: nv, sql_str : this.model.exec_params.sql_str})
      }
    },
    methods: {
      sqlChange(val){
        this.onChange('exec_params', {env: this.env, sql_str : val})
      }
    }
  }
</script>
