<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['verification']}}</div>
        <div class="panelBody">
            <TestFlowDefault :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>比较类型</div>
                <el-select v-model="params.verification_type" size="small">
                    <el-option label="字符对比" value="compare"></el-option>
                    <el-option label="XPath对比" value="xpathcompare"></el-option>
                    <el-option label="对象对比" value="objcompare"></el-option>
                </el-select>
            </div>
            <div class="panelRow">
                <div v-if="params.verification_type == 'compare'">
                    <div>期望字段</div>
                    <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        v-model="fields.expObj" />
                    <div>实际字段</div>
                    <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        v-model="fields.atlObj" />
                </div>
                <div v-if="params.verification_type == 'xpathcompare'">
                    <div>实际对象</div>
                    <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        v-model="fields.atlObj" />
                    <div>JsonPath表达式</div>
                    <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        v-model="fields.jsonFilter" />
                    <div>期望值</div>
                    <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        v-model="fields.expValue" />
                </div>
                <div v-if="params.verification_type == 'objcompare'">
                    <div>期望对象</div>
                    <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        v-model="fields.expObj" />
                    <div>实际对象</div>
                    <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        v-model="fields.atlObj" />
                    <div>对比主键</div>
                    <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        v-model="fields.pkMapStr" />
                    <div>忽略字段</div>
                    <el-input size="small"
                        style="width:90%; font-size:12px"
                        :disabled="readOnly"
                        v-model="fields.noCompareItemMapStr" />
                </div>
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
        params: this.copyParams(),
        fields: this.copyFields()
      }
    },
    watch:{
        params:{
            deep:true,
            handler(newVal){
                this.onChange('exec_params', newVal)
            }
        },
        fields:{
            deep:true,
            handler(newVal){
                if (this.params.verification_type == 'compare'){
                    this.params.parameters = this.fields.expObj + ',' + this.fields.atlObj
                } else if (this.params.verification_type == 'xpathcompare'){
                    this.params.parameters = this.fields.atlObj + ',' + this.fields.jsonFilter + ',' + this.fields.expValue
                } else if (this.params.verification_type == 'objcompare'){
                    this.params.parameters = this.fields.expObj + ',' + this.fields.atlObj + ',' + this.fields.pkMapStr + ',' + this.fields.noCompareItemMapStr
                }
            }
        }
    },
    methods: {
        copyParams(){
            let paramCopy = {
                verification_type: (this.model.exec_params && this.model.exec_params.verification_type) || 'compare',
                parameters: (this.model.exec_params && this.model.exec_params.parameters) || '',
            }
            return paramCopy
        },
        copyFields(){
            let data = {
                expObj:'',
                atlObj:'',
                jsonFilter:'',
                expValue:'',
                pkMapStr:'', 
                noCompareItemMapStr:''
            }
            let paramCopy = {
                verification_type: (this.model.exec_params && this.model.exec_params.verification_type) || 'compare',
                parameters: (this.model.exec_params && this.model.exec_params.parameters) || '',
            }
            if (paramCopy.verification_type == 'compare'){
                data.expObj = paramCopy.parameters.split(',')[0]
                data.atlObj = paramCopy.parameters.split(',')[1]
            } else if (paramCopy.verification_type == 'xpathcompare'){
                data.atlObj = paramCopy.parameters.split(',')[0]
                data.jsonFilter = paramCopy.parameters.split(',')[1]
                data.expValue = paramCopy.parameters.split(',')[2]
            } else if (paramCopy.verification_type == 'objcompare'){
                data.expObj = paramCopy.parameters.split(',')[0]
                data.atlObj = paramCopy.parameters.split(',')[1]
                data.pkMapStr = paramCopy.parameters.split(',')[2]
                data.noCompareItemMapStr = paramCopy.parameters.split(',')[3]
            }
            return data;
        }
    }

  }
</script>
