<template>
    <div>
        <div>
            <el-input v-model="jobId" size="small" style="display:inline-block;width:200px;margin-right:10px" placeholder="输入JobId查询"></el-input>
            <el-button type="primary" size="small" style="display:inline-block;" @click="query">查询</el-button>
        </div>
        <hr>
        <el-table :data="taskList" border style="width: 100%">
            <el-table-column type="index" label="#" > </el-table-column>
            <el-table-column prop="jobId" label="Job ID" > </el-table-column>
            <el-table-column prop="jobName" label="Job名称" > </el-table-column>
            <el-table-column prop="id" label="Task ID" > </el-table-column>
            <el-table-column prop="paramName" label="参数名称" > </el-table-column>
            <el-table-column prop="paramIndex" label="参数索引" > </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="230"> </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="230"> </el-table-column>
            <el-table-column label="状态" >
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0" style="color:red">失败</span>
                    <span v-if="scope.row.status == 1" style="color:green">成功</span>
                    <span v-if="scope.row.status == 2" style="color:orange">运行中</span>
                    <span v-if="scope.row.status == 3" style="color:orange">异常</span>
                    <span v-if="scope.row.status == 4" style="color:blue">等待</span>
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
                <MyChart :id="'pieChart'" :option="pieOption" style="width:50%;display:inline-block;height:400px;"/>
                <MyChart :id="'barChart'" :option="barOption" style="width:50%;display:inline-block;height:400px;"/>
                <div>
                    <!-- 状态过滤框 -->
                    <el-select v-model="filterType" style="display:inline-block;width:200px;margin-right:20px" placeholder="请选择类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(status, index) in statuses" :key="status" :value="index" :label="status"></el-option>
                    </el-select>
                    <!-- 时间过滤框 -->
                    <el-date-picker v-model="filterDates" type="datetimerange" style="margin-right:20px;" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker>
                    <!-- 查询按钮 -->              
                    <el-button type="primary" style="margin-right:20px;" size="small" icon="el-icon-document" @click="refreshDia">查询</el-button>
                </div>
                <hr>
                <el-table :data="taskDetail" style="width: 100%">
                    <el-table-column label="#" type="expand"> 
                        <template slot-scope="scope">
                            <el-table :data="scope.row.stepResults" style="width: 100%">
                                <el-table-column type="index" label="步骤" width="100"> </el-table-column>
                                <el-table-column prop="label" label="名称" width="150"> </el-table-column>
                                <el-table-column prop="clazz" label="类型" width="100"> </el-table-column>
                                <el-table-column prop="config" label="配置" > 
                                    <template slot-scope="scope">
                                        <el-tooltip effect="light" popper-class="popper_w" :content="scope.row.config" placement="bottom-start">
                                            <div style="max-height:70px;">
                                                {{scope.row.config}}
                                            </div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="data" label="结果" > 
                                    <template slot-scope="scope">
                                        <el-tooltip effect="light" popper-class="popper_w" :content="scope.row.data" placement="bottom-start">
                                            <div style="max-height:70px;">
                                                {{scope.row.data}}
                                            </div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column label="状态" width="80">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.status == 0" style="color:red">失败</span>
                                        <span v-if="scope.row.status == 1" style="color:green">成功</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="详情">
                                    <template slot-scope="scope">
                                        <el-button v-if="scope.row.clazz == 'compare_obj'" type="text" icon="el-icon-document" size="small" @click="stepDetail(scope.row, scope.$index)">查看</el-button>
                                    </template>    
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="paramName" label="参数名称" > </el-table-column>
                    <el-table-column prop="paramIndex" label="参数索引" > </el-table-column>
                    <el-table-column label="参数值" width="300">
                        <template slot-scope="scope">
                            <el-tooltip effect="light" popper-class="popper_w" :content="scope.row.paramValue" placement="bottom-start">
                                <div style="max-height:70px;">
                                    {{scope.row.paramValue}}
                                </div>
                            </el-tooltip>
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
                <el-row>
                    <el-col :span="24">
                        <div style="padding-top: 20px;float:right;margin-right:6px;">
                        <el-pagination
                            @size-change="handleSizeChangeDia"
                            @current-change="handleCurrentChangeDia"
                            :current-page="currentPageDia"
                            :page-sizes="[5, 10, 50, 100]"
                            :page-size="pageSizeDia"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalDia">
                        </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </div>
      </el-dialog>
      <compare-obj-result-dia
        ref="compareMonaco"
        :visible.sync="compareDialogVisible">
      </compare-obj-result-dia>
    </div>
</template>

<script>
import { getTask,taskResult,taskCaseResult } from '@/api/job'
import MyChart from './Chart.vue'
import CompareObjResultDia from './compareObjResult.vue'

export default {
    name:'jobResult',
    components:{
        MyChart,CompareObjResultDia
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
            verificationShow:false,
            jobId:'',
            taskId:0,
            taskList:[],
            taskDetail:[],
            pieOption:{},
            barOption:{},
            currentPage: 1,
            pageSize: 10,
            total: 0,
            filterName: '',
            currentPageDia: 2,
            pageSizeDia: 5,
            passDia:0,
            failDia:0,
            totalDia: 0,
            filterNameDia: '',
            compareDialogVisible: false,
            filterType: '',
            filterDates: null, 
            statuses: ['失败', '成功']              // 修改
        }
    },
    watch: {
        data(passDia, failDia) {
            this.buildChartOption();
        }
    },
    created(){
        if(this.$route.query && this.$route.query.jobId){
            this.jobId = this.$route.query.jobId
        } else {
            this.jobId = ''
        }
        this.query()
    },
    methods:{
        query(){
            let req = {
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "jobId": this.jobId
            }
            getTask(req).then(res => {
                this.taskList = res.jobDetails
                this.total = res.total
            })
        },
        handleSizeChange(size) {
            this.pageSize = size
            let req = {
                "filter": this.filterName,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "jobId": this.jobId
            }
            getTask(req).then(res => {
                this.taskList = res.jobDetails
                this.total = res.total
            })
        },
        handleCurrentChange(currentPage){
            this.currentPage = currentPage
            let req = {
                "filter": this.filterName,
                "pageNum": this.currentPage,
                "pageSize": this.pageSize,
                "jobId": this.jobId
            }
            getTask(req).then(res => {
                if(res && res.jobDetails){
                    this.taskList = res.jobDetails
                    this.total = res.total
                }
            })    
        },
        detail(row){
            this.currentPageDia = 1;
            this.pageSizeDia = 5;
            let req = {
                "pageNum": this.currentPageDia,
                "pageSize": this.pageSizeDia,
                "taskId": row.id
            }
            taskResult(req).then(res => {
                this.taskId = row.id
                this.taskDetail = res.indexResults
                this.passDia = res.pass
                this.failDia = res.fail
                this.totalDia = res.total
                this.buildChartOption()
                this.show = true
            })
        },
        refreshDia() {
            this.currentPageDia = 1;
            let req = {
                "pageNum": this.currentPageDia,
                "pageSize": this.pageSizeDia,
                "taskId": this.taskId,
                "status": this.filterType,
                "startTime": !this.filterDates ? null : this.filterDates[0],
                "endTime": !this.filterDates ? null : this.filterDates[1],
            }
            taskResult(req).then(res => {
                this.taskDetail = res.indexResults
                this.passDia = res.pass              
                this.failDia = res.fail
                console.log(this.passDia)
                console.log(this.failDia)
                this.totalDia = res.total
                this.buildChartOption()
                this.pieChart && this.pieChart.mergeOptions(this.option, true);
                this.show = true
            })
        },
        handleSizeChangeDia(size) {
            this.currentPageDia = 1;
            this.pageSizeDia = size
            let req = {
                "pageNum": this.currentPageDia,
                "pageSize": this.pageSizeDia,
                "taskId": this.taskId,
                "status": this.filterType,
                "startTime": !this.filterDates ? null : this.filterDates[0],
                "endTime": !this.filterDates ? null : this.filterDates[1]
            }
            taskResult(req).then(res => {
                this.taskDetail = res.indexResults
                this.passDia = res.pass
                this.failDia = res.fail
                this.totalDia = res.total
                this.buildChartOption()
                this.show = true
            })
        },
        handleCurrentChangeDia(currentPage){
            this.currentPageDia = currentPage
            let req = {
                "pageNum": this.currentPageDia,
                "pageSize": this.pageSizeDia,
                "taskId": this.taskId,
                "status": this.filterType,
                "startTime": !this.filterDates ? null : this.filterDates[0],
                "endTime": !this.filterDates ? null : this.filterDates[1]
            }
            taskResult(req).then(res => {
                this.taskDetail = res.indexResults
                this.passDia = res.pass
                this.failDia = res.fail
                this.totalDia = res.total
                this.buildChartOption()
                this.show = true
            })    
        },
        stepDetail(row, index){
            this.$refs.compareMonaco.getResulte(row.id, index)
            this.compareDialogVisible = true
        },
        buildChartOption(){
            let successCount = this.passDia
            let errorCount = this.failDia
            this.pieOption = {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            {value: successCount, name: '成功'},
                            {value: errorCount, name: '失败'},
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            this.barOption = {
                title: {
                    text: '执行时间（ms）',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {           
                        type: 'shadow'   
                    }
                },
                xAxis: {
                    type: 'category',
                    data: this.taskDetail.map(x => `${x.paramName}[${x.paramIndex}]`)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.taskDetail.map(x => this.$moment(x.endTime) - this.$moment(x.startTime)),
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function(params) { 
                                var colorList = ['#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                return colorList[params.dataIndex % 17] 
                            }
                        },
                    },
                }]
            }
        }
    }
}
</script>

<style>
.popper_w{
    max-width: 650px;
}
</style>