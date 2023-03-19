<template>
    <div>
        <div>
            <el-input v-model="jobId" size="small" style="display:inline-block;width:200px;margin-right:10px" placeholder="输入TaskId查询"></el-input>
            <el-button type="primary" size="small" style="display:inline-block;" @click="query">查询</el-button>
        </div>
        <hr>
        <el-table :data="taskList" border style="width: 100%">
            <el-table-column type="index" label="#" > </el-table-column>
            <el-table-column prop="id" label="Task Id" > </el-table-column>
            <el-table-column prop="planId" label="Test Plan Id" > </el-table-column>
            <el-table-column prop="planName" label="Test Plan名称" > </el-table-column>
            <el-table-column prop="status" label="Status" > </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="230"> </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="230"> </el-table-column>
            <el-table-column label="状态" >
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0" style="color:red">失败</span>
                    <span v-if="scope.row.status == 1" style="color:green">成功</span>
                    <span v-if="scope.row.status == 2" style="color:orange">运行中</span>
                    <span v-if="scope.row.status == 3" style="color:orange">异常</span>
                </template>
            </el-table-column>
            <el-table-column label="详情" >
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-document" size="small" @click="detail(scope.row)">查看</el-button>
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
        <el-dialog
            title="结果详情"
            fullscreen
            :visible.sync="show">
            <div>
                <el-table :data="taskResult" style="width: 100%">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="label" label="Task名称" > </el-table-column>
                    <el-table-column prop="clazz" label="Task类型" > </el-table-column>
                    <el-table-column prop="config" label="Task配置" > </el-table-column>
                    <el-table-column prop="data" label="Task结果" > 
                        <template slot-scope="scope">
                            <el-link
                                type="primary"
                                :underline="false"
                                style="font-size: 12px; font-weight: normal"
                                :href="scope.row.data"
                            >
                            {{ scope.row.data }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startTime" label="开始时间" width="230"> </el-table-column>
                    <el-table-column prop="endTime" label="结束时间" width="230"> </el-table-column>
                    <el-table-column label="状态" >
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0" style="color:red">失败</span>
                            <span v-if="scope.row.status == 1" style="color:green">成功</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
      </el-dialog>
    </div>
</template>

<script>
import { getTask, getResult } from '@/api/ops'

export default {
    name:'jobResult',
    components:{
    },
    props: {
        opts: {
            type: Object,
            default () {
                return {}
            }
        },
        height: {
            type: Number,
            default: 300
        }
    },
    data(){
        return{
            show:false,
            taskId:0,
            taskList:[],
            taskResult:[],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            filterName: '',
            filterType: '',
            filterDates: null, 
            statuses: ['失败', '成功']              // 修改
        }
    },
    created(){
        if(this.$route.query && this.$route.query.taskId){
            this.taskId = this.$route.query.taskId
        } else {
            this.taskId = ''
        }
        this.query()
    },
    methods:{
        query(){
            let req = {
                "pageNum": this.currentPage,
                "pageSize": this.pageSize
            }
            getTask(req).then(res => {
                this.taskList = res.opsTaskDetails
                this.total = res.total
            })
        },
        handleSizeChange(size) {
            this.pageSize = size
            let req = {
                "filter": this.filterName,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize
            }
            getTask(req).then(res => {
                this.taskList = res.opsTaskDetails
                this.total = res.total
            })
        },
        handleCurrentChange(currentPage){
            this.currentPage = currentPage
            let req = {
                "filter": this.filterName,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize
            }
            getTask(req).then(res => {
                if(res && res.jobDetails){
                    this.taskList = res.opsTaskDetails
                    this.total = res.total
                }
            })    
        },
        detail(row){
            this.currentPageDia = 1;
            this.pageSizeDia = 5;
            let req = {
                "opsTaskId": row.id
            }
            getResult(req).then(res => {
                this.taskResult = res.opsPlanTaskResultDetails
                this.totalDia = res.total
                this.show = true
            })
        }
    }
}
</script>

<style>
.popper_w{
    max-width: 650px;
}
</style>