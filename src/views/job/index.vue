<template>
    <div>
        <el-input v-model="filterName" size="small" style="display:inline-block;width:200px;margin-right:10px" placeholder="输入Job名称查询"></el-input>
        <!-- 查询按钮 -->              
        <el-button type="primary" style="margin-right:20px;" size="small" icon="el-icon-document" @click="refreshD">查询</el-button>
        <edit op="add" :row="{}" style="margin-right:20px;" @reload="loadJobList" />
        <el-button type="primary" style="margin-right:20px;" size="small" icon="el-icon-document" @click="onExecList">执行</el-button>
        <hr>
        <el-table :data="jobList" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
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
                    <!-- <el-button type="text" icon="el-icon-video-play" size="small" style="margin-right:10px;" @click="onExec(scope.row)">执行</el-button> -->
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
        <el-row>
            <el-col :span="24">
                <div style="padding-top: 20px;float:right;margin-right:6px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import edit from './edit.vue'
import { queryAll, del, updateStatus, exec, batchExec } from '@/api/job'
export default {
    name: 'Job',
    components:{
        edit
    },
    data(){
        return{
            multipleSelection: [],
            jobList:[],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            filterName: '',
        }
    },
    created(){
        this.loadJobList()
    },
    methods:{
        loadJobList(){
            let req = {
                "filter": this.filterName,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize
            }
            console.log(req)
            queryAll(req).then(res => {
                if(res && res.jobDetails){
                    res.jobDetails.forEach(item => {
                        item.status = item.status == 1 ? true : false
                    });
                    this.jobList = res.jobDetails
                    this.total = res.total
                }
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection)
        },
        onExecList(){
            var arr=this.multipleSelection;
            let multiIds = [];
            for (var i=0;i<arr.length;i++){
                console.log(arr[i].id)
                multiIds.push(arr[i].id);
            }
            batchExec(multiIds).then(res => {
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
        onExec(row){
            this.multipleSelection
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
        },   
        refreshD(size) {
            this.currentPage = 1;
            let req = {
                "filter": this.filterName,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize
            }
            queryAll(req).then(res => {
                if(res && res.jobDetails){
                    res.jobDetails.forEach(item => {
                        item.status = item.status == 1 ? true : false
                    });
                    this.jobList = res.jobDetails
                    this.total = res.total
                }
            })
        },
        handleSizeChange(size) {
            this.pageSize = size
            let req = {
                "filter": this.filterName,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize
            }
            queryAll(req).then(res => {
                if(res && res.jobDetails){
                    res.jobDetails.forEach(item => {
                        item.status = item.status == 1 ? true : false
                    });
                    this.jobList = res.jobDetails
                    this.total = res.total
                }
            })
        },
        handleCurrentChange(currentPage){
            this.currentPage = currentPage
            let req = {
                "filter": this.filterName,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize
            }
            queryAll(req).then(res => {
                if(res && res.jobDetails){
                    res.jobDetails.forEach(item => {
                        item.status = item.status == 1 ? true : false
                    });
                    this.jobList = res.jobDetails
                    this.total = res.total
                }
            })    
        }
    }
}
</script>