<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['request']}}</div>
        <div class="panelBody">
            <TestFlowDefault :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>URL：</div>
                <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        type="textarea"
                        :rows="4"
                        :value="params.url"
                        @input="onUrlInput" />
            </div>
            <div class="panelRow">
                <div>Header：</div>
                <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        type="textarea"
                        :rows="2"
                        :value="params.request_headers"
                        @input="onHeadersInput" />
            </div>
            <div class="panelRow">
                <div>Request Type：</div>
                <el-radio-group v-model="params.request_type" size="mini">
                    <el-radio-button label="get">GET</el-radio-button>
                    <el-radio-button label="post">POST</el-radio-button>
                    <el-radio-button label="put">PUT</el-radio-button>
                    <el-radio-button label="delete">DELETE</el-radio-button>
                </el-radio-group>
            </div>
            <div class="panelRow">
                <div>Request Body：</div>
                <MonacoEditor style="width:90%;height:300px;"
                    language="json"
                    theme="hc-black"
                    @change="bodyChange"
                    value=""
                    ref="bodyEditor">
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
  import { deepCopy } from '@/utils/CommonUtil';
  const jsonFormat = require('json-format');
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
        params: this.copyParams()
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
                request_headers: (this.model.exec_params && this.model.exec_params.request_headers) || '{}',
                url: (this.model.exec_params && this.model.exec_params.url) || '',
                request_type: (this.model.exec_params && this.model.exec_params.request_type) || 'get',
                content_type: (this.model.exec_params && this.model.exec_params.content_type) || 'json',
                request_body: (this.model.exec_params && this.model.exec_params.request_body) || '{}'
            }
            this.$nextTick(() => {
                try {
                    this.$refs.bodyEditor && this.$refs.bodyEditor._setValue(jsonFormat(JSON.parse(this.params.request_body)))
                } catch (error) {
                    this.$refs.bodyEditor._setValue(this.params.request_body
                    )
                }
            })
            return data
        },
        bodyChange(value) {
            if(value){
                try {
                    //this.params.request_body = JSON.stringify(JSON.parse(value || '{}'))
                    this.params.request_body = JSON.stringify(JSON.parse(value))
                } catch (error) {
                    this.params.request_body = value
                }
            }
        },
        onUrlInput(val){
            this.params.url = val
        },
        onHeadersInput(val){
            this.params.request_headers = val
        }
    }
  }
</script>
<style lang="scss">
    .panelBody {
        .panelRow {
            text-align: left;
            display: inline-block;
            font-size: 12px;
            width: 100%;
            padding: 5px 12px;
        }
    }
</style>
