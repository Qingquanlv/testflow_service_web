<template>
    <span>
      <el-button :type="op == 'add' ? 'primary':'text'" size="small" @click="onShow" :icon="op == 'add' ? 'el-icon-plus' : 'el-icon-edit'">
          {{ op == 'add' ? '新增' : '编辑'}}
      </el-button>
      <el-dialog
        title="新增/编辑Job"
        @closed="$emit('reload')"
        :visible.sync="show">
            <div>
                <el-form :model="job" label-width="100px" size="mini">
                    <el-form-item label="Feature ID">
                        <el-input v-model="job.featureId"></el-input>
                    </el-form-item>
                    <el-form-item label="Job名称">
                        <el-input v-model="job.name"></el-input>
                    </el-form-item>
                    <el-form-item label="参数名称">
                        <el-input v-model="job.paramName"></el-input>
                    </el-form-item>
                    <el-form-item label="参数索引">
                        <el-input v-model="job.paramIndex"></el-input>
                    </el-form-item>
                    <el-form-item label="Cron表达式">
                        <el-input v-model="job.cron"></el-input>
                    </el-form-item>
                    <el-form-item label="Job描述">
                        <el-input type="textarea" v-model="job.description"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="状态">
                        <el-switch v-model="job.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </el-form-item> -->
                </el-form>
            </div>
            <span slot="footer" >
                <el-button @click="show = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="onSave">保存</el-button>
            </span>
      </el-dialog>
    </span>
</template>

<script>
import { create, update } from '@/api/job'
import {deepCopy, uuid} from '../../utils/CommonUtil'
export default {
    data(){
        return{
            show: false,
            job:{
                featureId:'',
                name:'',
                paramName:'',
                paramIndex:'',
                cron:'',
                description:''
            }
        }
    },
    props:{
      op: {
          type:String,
          default: () => {
              return 'add'
          }
      },
      row:{
          type: Object,
          default: () => {
              return {}
          }
      }
    },
    methods:{
        onShow(){
            this.show = true
            if(this.op == 'add'){
                this.job = {
                    featureId:'',
                    name:'',
                    paramName:'',
                    paramIndex:'',
                    cron:'',
                    description:''
                }
            } else {
                this.job = deepCopy(this.row)
            }
        },
        onSave(){
            let req = deepCopy(this.job)
            req.requestId = uuid()
            if(this.op == 'add'){
                create(req).then(res => {
                    if(res && res.status && res.status.success){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                        this.show = false
                    } else {
                        this.$message({
                            message: '操作失败',
                            type: 'success'
                        })
                    }
                })
            } else {
                req.jobId = req.id
                update(req).then(res => {
                    if(res && res.status && res.status.success){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                        this.show = false
                    } else {
                        this.$message({
                            message: '操作失败',
                            type: 'success'
                        })
                    }
                })
            }
        }
    }
}
</script>