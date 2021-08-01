<template>
    <div>
        <div>
            <el-input v-model="jobId" size="small" style="display:inline-block;width:200px;margin-right:10px" placeholder="输入JobId查询"></el-input>
            <el-button type="primary" size="small" style="display:inline-block;" @click="query">查询</el-button>
        </div>
        <hr>
        <el-table :data="taskList" border style="width: 100%">
            <el-table-column prop="id" label="ID" > </el-table-column>
            <el-table-column prop="startTime" label="开始时间" > </el-table-column>
            <el-table-column prop="endTime" label="结束时间" > </el-table-column>
            <el-table-column label="状态" >
                <template slot-scope="scope">
                    {{ scope.row.status }}
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
                <el-table :data="taskDetail" border style="width: 100%">
                    <el-table-column label="#" type="expand"> 
                        <template slot-scope="scope">
                            
                        </template>
                    </el-table-column>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="paramName" label="参数名称" > </el-table-column>
                    <el-table-column prop="paramIndex" label="参数索引" > </el-table-column>
                    <el-table-column prop="param" label="参数值" > </el-table-column>
                    <el-table-column prop="startTime" label="开始时间" > </el-table-column>
                    <el-table-column prop="endTime" label="结束时间" > </el-table-column>
                    <el-table-column label="状态" >
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
    name:'jobResult',
    data(){
        return{
            show:false,
            jobId:'',
            taskList:[],
            taskDetail:[]
        }
    },
    methods:{
        query(){

        },
        detail(row){

        }
    }
}
</script>