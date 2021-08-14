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
                </template>
            </el-table-column>
            <el-table-column label="详情" >
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-document" size="small" @click="detail(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="结果详情"
            fullscreen
            :visible.sync="show">
            <div>
                <MyChart :id="'pieChart'" :option="pieOption" style="width:50%;display:inline-block;height:400px;"/>
                <MyChart :id="'barChart'" :option="barOption" style="width:50%;display:inline-block;height:400px;"/>
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
            </div>
      </el-dialog>
    </div>
</template>

<script>
import { getTask,taskResult } from '@/api/job'
import MyChart from './Chart.vue'

export default {
    name:'jobResult',
    components:{
        MyChart
    },
    data(){
        return{
            show:false,
            jobId:'',
            taskList:[],
            taskDetail:[],
            pieOption:{},
            barOption:{}
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
            getTask({jobId: this.jobId}).then(res => {
                this.taskList = res.jobDetails
            })
        },
        detail(row){
            taskResult(row.id).then(resp => {
                this.taskDetail = resp.indexResults
                this.buildChartOption()
                this.show = true
            })
        },
        buildChartOption(){
            let successCount = 0
            let errorCount = 0
            this.taskDetail.forEach(item => {
                if(item.status == 0){
                    errorCount++
                } else if(item.status == 1) {
                    successCount++
                }
            })
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