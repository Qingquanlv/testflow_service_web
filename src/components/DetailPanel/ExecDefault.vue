<template>
    <div>
        <el-button type="warning" size="small" style="margin-right:10px;" @click="onExec">执行</el-button>
        <el-dialog title="参数 & 结果" :visible.sync="show" width="70%" append-to-body>
            <div style="width:50%;height:500px;display:inline-block">
                <h3>执行参数</h3>
                <MonacoEditor style="width:100%;height:500px;"
                    theme="vs-dark"
                    @change="onChange"
                    value="{}"
                    ref="reqEditor">
                </MonacoEditor>
            </div>
            <div style="width:50%;height:500px;display:inline-block">
                <h3>执行结果</h3>
                <MonacoEditor style="width:100%;height:500px;"
                    theme="vs-dark"
                    value="{}"
                    ref="respEditor">
                </MonacoEditor>
            </div>
            <div slot="footer">
                <el-button @click="show = false" size="small">取 消</el-button>
                <el-button type="primary" @click="doExec" size="small">执 行</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor.vue';
import { uuid } from '@/utils/CommonUtil'
import { exec } from '@/api/feature'
const jsonFormat = require('json-format');
export default {
    components:{
        MonacoEditor
    },
    data(){
        return{
            show: false,
            parameters:{}
        }
    },
    props:{
        node: {
            type:Object,
            default: ()=>({}),
        }
    },
    methods:{
        onChange(value) {
            if(value){
                try {
                    this.parameters = JSON.parse(value || '[]') 
                } catch (error) {
                }
            }
        },
        onExec(){
            this.show = true
            this.parameters = {}
            this.$refs.reqEditor && this.$refs.reqEditor._setValue('{}')
            this.$refs.respEditor && this.$refs.respEditor._setValue('{}')
        },
        doExec(){
            let req = {
                "requestId": uuid(),
                "params": this.parameters,
                "config":{
                    "clazz": this.node.clazz,
                    "label": this.node.label,
                    "exec_params": this.node.exec_params
                }
            }
            exec(req).then(resp => {
                this.$refs.respEditor && this.$refs.respEditor._setValue(jsonFormat(resp))
            })
        }
    }
}
</script>


