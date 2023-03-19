<template>
  <div>
    <div>
      <el-input v-model="filterName" size="small" style="display:inline-block;width:200px;margin-right:10px" placeholder="输入Test Plan Name查询"></el-input>
      <el-button type="primary" size="small" style="display:inline-block;" @click="filterQuery">查询</el-button>
      <edit style="float:right;margin-right:6px;" op="add" :row="{}" @reload="loadOpsPlanList" />
    </div>
    <hr>
    <el-table :data="testPlanList" border style="width: 100%">
      <el-table-column prop="testPlanId" label="ID" > </el-table-column>
      <el-table-column prop="testPlanName" label="名称" > </el-table-column>
      <el-table-column prop="description" label="描述" > </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="success" size="small" style="margin-right:10px;" @click="onExec(scope.row)">执行</el-button>
          <edit op="edit" :row="scope.row" @reload="loadOpsPlanList" />
          <el-button type="danger" size="small" style="margin-left:10px;" @click="doDel(scope.row)">删除</el-button>
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
import { deepCopy, uuid } from '@/utils/CommonUtil'
import edit from './edit.vue'
import { queryAll, exec, del } from '@/api/ops'
const jsonFormat = require('json-format');
export default {
  data(){
    return{
      testPlanList:[],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      filterName: '',
      row:{}
    }
  },
  created(){
    this.loadOpsPlanList()
  },
  components:{
    edit
  },
  methods:{
    loadOpsPlanList(){
      let req = {
          "filter": this.filterName,
          "pageNum": this.currentPage,
          "pageSize": this.pageSize
      }
      queryAll(req).then(resp => {
        this.testPlanList = resp.features
        this.total = resp.total
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      let req = {
          "filter": this.filterName,
          "pageNum": this.currentPage,
          "pageSize": this.pageSize
      }
      console.log(this.pageSize)  
      queryAll(req).then(resp => {
        this.testPlanList = resp.features
        this.total = resp.total
      })
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage
      let req = {
          "filter": this.filterName,
          "pageNum": this.currentPage,
          "pageSize": this.pageSize
      }
      console.log(this.currentPage)  //点击第几页
      queryAll(req).then(resp => {
        this.testPlanList = resp.features
        this.total = resp.total
      })    
    },
    filterQuery(){
      this.currentPage = 1
      let req = {
        "filter": this.filterName,
        "pageNum": this.currentPage,
        "pageSize": this.pageSize
      }
      console.log(this.currentPage)  //点击第几页
      queryAll(req).then(resp => {
        this.testPlanList = resp.features
        this.total = resp.total
      })    
    },
    onExec(row){
      exec(row.testPlanId).then(resp => {
        this.$message({
          message: resp.status && resp.status.success ? '执行成功' : '执行失败',
          type: resp.status && resp.status.success ? 'success' : 'error'
        });
      })
    },
    doDel(row){
      del(row.testPlanId).then(resp => {
        this.loadOpsPlanList()  
        this.$message({
          message: resp.status && resp.status.success ? '删除成功' : '删除失败',
          type: resp.status && resp.status.success ? 'success' : 'error'
        });
      })
    }
  }
}
</script>
