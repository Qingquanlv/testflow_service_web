<template>
    <div>
        <edit op="add" :row="{}" @reload="loadJobList" />
        <hr>
        <el-table :data="jobList" border style="width: 100%">
            <el-table-column prop="id" label="ID" > </el-table-column>
            <el-table-column prop="featureId" label="Feature ID" > </el-table-column>
            <el-table-column prop="name" label="Job名称" > </el-table-column>
            <el-table-column prop="paramName" label="参数名称" > </el-table-column>
            <el-table-column prop="paramIndex" label="参数索引" > </el-table-column>
            <el-table-column prop="cron" label="Cron表达式" > </el-table-column>
            <el-table-column prop="description" label="Job描述" > </el-table-column>
            <el-table-column label="状态" >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" @change="statusChange(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-video-play" size="small" style="margin-right:10px;" @click="onExec(scope.row)">执行</el-button>
                    <edit op="edit" :row="scope.row" @reload="loadJobList" />
                    <el-button type="text" icon="el-icon-delete" size="small" style="margin-left:10px;" @click="doDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column label="结果" >
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-document" size="small" @click="result(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import edit from './edit.vue'
import { queryAll, del, updateStatus, exec } from '@/api/job'
export default {
    name: 'Job',
    components:{
        edit
    },
    data(){
        return{
            jobList:[]
        }
    },
    created(){
        this.loadJobList()
    },
    methods:{
        loadJobList(){
            queryAll().then(res => {
                if(res && res.jobDetails){
                    res.jobDetails.forEach(item => {
                        item.status = item.status == 1 ? true : false
                    });
                    this.jobList = res.jobDetails
                }
            })
        },
        onExec(row){
            exec(row.id).then(res => {
                if(res && res.status && res.status.success){
                    this.$message({
                        message: 'Job执行中...',
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: '执行失败',
                        type: 'success'
                    })
                }
            })
        },
        doDel(row){
            del(row.id).then(res => {
                if(res && res.status && res.status.success){
                    this.loadJobList()
                } else {
                    this.$message({
                        message: '操作失败',
                        type: 'success'
                    })
                }
            })
        },
        result(row){
            this.$router.push({
                path: '/job-result',
                query: {
                    jobId: row.id
                }
            })
        },
        statusChange(row){
            let req = {
                jobId: row.id,
                status: row.status ? 1 : 0
            }
            updateStatus(req).then(res => {
                this.loadJobList()
            })
        }
    }
}
</script>