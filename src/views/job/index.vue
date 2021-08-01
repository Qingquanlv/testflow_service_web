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
            <el-table-column prop="desc" label="Job描述" > </el-table-column>
            <el-table-column label="状态" >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-video-play" size="small" style="margin-right:10px;" @click="onExec(scope.row)">执行</el-button>
                    <edit op="edit" :row="scope.row" @reload="loadFeaturnList" />
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
    methods:{
        loadJobList(){

        },
        onExec(row){

        },
        doDel(row){

        },
        result(row){

        }
    }
}
</script>