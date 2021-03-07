<template>
    <span>
        <el-button v-if="type === 'add'" type="primary" size="small" icon="el-icon-plus" @click="show = true">创建参数</el-button>
        <el-button v-else type="text" icon="el-icon-edit" @click="show = true">编辑</el-button>
        <el-dialog 
            width="70%"
            title="创建/编辑参数"
            :visible.sync="show">
            <div>
                参数名： <el-input size="mini"
                    style="width:300px" 
                    placeholder="请输入参数名" 
                    prefix-icon="el-icon-apple" 
                    v-model="copyItem.parameter_name">
                </el-input>
            </div>
            <hr>
            <el-button type="text" icon="el-icon-plus" style="color:green" @click="onAddKey()">
                添加
            </el-button>
            <div>
                <el-table :data="copyItem.parameters" border style="width: 100%">
                    <el-table-column prop="parameter_key" label="Key" width="180">
                        <template slot-scope="scope">
                            <span v-if="!scope.row.keyDirty">{{scope.row.parameter_key}}</span>
                            <el-input v-else style="width:70%;" size="mini" v-model="scope.row.parameter_key"></el-input>
                            <el-button style="margin-left:10px" icon="el-icon-edit" size="mini" circle @click="onEdit(scope.row, 'key')">
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="parameter_value" label="Value">
                        <template slot-scope="scope">
                            <span v-if="!scope.row.valDirty">{{scope.row.parameter_value}}</span>
                            <el-input type="textarea" :rows="3" v-else style="width:70%;" size="mini" v-model="scope.row.parameter_value"></el-input>
                            <el-button style="margin-left:10px" icon="el-icon-edit" size="mini" circle @click="onEdit(scope.row, 'val')">
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" style="color:red" @click="onDeleteKey(scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer">
                <el-button size="mini" @click="show = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="onOk">保 存</el-button>
            </span>
        </el-dialog>
    </span>
</template>

<script>
import { update, create } from '@/api/parameter'
export default {
    props:{
        type:'',
        item:{},
    },
    data(){
        return{
            show: false,
            copyItem:{}
        }
    },
    watch:{
        show(val){
            if(val){
                if(!this.item.parameters){
                    this.item.parameters = []
                }
                this.copyItem = JSON.parse(JSON.stringify(this.item))
            }
        }
    },
    methods:{
        onOk(){
            this.copyItem.requestId = new Date().getTime()
            if(this.type == 'add'){
                create(this.copyItem).then(resp => {
                    this.tipMsg(resp)
                })
            } else {
                update(this.copyItem).then(resp => {
                    this.tipMsg(resp)
                })
            }
        },
        tipMsg(resp){
            if(!resp.status.success){
                this.$message({
                    type: 'error',
                    message: resp.status.message
                })  
                return
            }
            this.$message({
                type: 'success',
                message: '创建成功'
            })                    
            this.show = false
            this.$emit('reload')
        },
        onDeleteKey(row){
            this.copyItem.parameters = this.copyItem.parameters.filter(p => p.parameter_key != row.parameter_key)
        },
        onAddKey(){
            this.copyItem.parameters.push({
                parameter_key:'',
                parameter_value:'',
                keyDirty:true,
                valDirty:true
            })
        },
        onEdit(row, type){
            row[`${type}Dirty`] = true
            this.copyItem.parameters = JSON.parse(JSON.stringify(this.copyItem.parameters))
        }
    }
}
</script>