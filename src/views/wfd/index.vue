<template>
  <div>
    <div>
      <el-input v-model="filterName" size="small" style="display:inline-block;width:200px;margin-right:10px" placeholder="输入Feature Name查询"></el-input>
      <el-button type="primary" size="small" style="display:inline-block;" @click="filterQuery">查询</el-button>
      <edit style="float:right;margin-right:6px;" op="add" :row="{}" @reload="loadFeaturnList" />
    </div>
    <hr>
    <el-table :data="featureList" border style="width: 100%">
      <el-table-column prop="feature_id" label="ID" > </el-table-column>
      <el-table-column prop="featureName" label="名称" > </el-table-column>
      <el-table-column prop="description" label="描述" > </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="success" size="small" style="margin-right:10px;" @click="onExec(scope.row)">执行</el-button>
          <edit op="edit" :row="scope.row" @reload="loadFeaturnList" />
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
    <el-dialog title="参数 & 结果" :visible.sync="show" width="70%">
      <div style="width:50%;height:500px;display:inline-block">
        <h3>执行参数</h3>
        <MonacoEditor style="width:100%;height:500px;"
            theme="vs-dark"
            @change="onChange"
            value="{}"
            ref="reqEditor">
        </MonacoEditor>
      </div>
      <div style="width:50%;height:500px;display:inline-block">
        <h3>执行结果</h3>
        <MonacoEditor style="width:100%;height:500px;"
            theme="vs-dark"
            value="{}"
            ref="respEditor">
        </MonacoEditor>
      </div>
      <div slot="footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="doExec">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepCopy, uuid } from '@/utils/CommonUtil'
import edit from './edit.vue'
import MonacoEditor from '@/components/MonacoEditor.vue';
import { queryAll, getById, del, exec } from '@/api/feature'
const jsonFormat = require('json-format');
export default {
  data(){
    return{
      featureList:[],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      filterName: '',
      show:false,
      row:{},
      parameters:{},
    }
  },
  created(){
    this.loadFeaturnList()
  },
  components:{
    edit,MonacoEditor
  },
  methods:{
    loadFeaturnList(){
      let req = {
          "filter": this.filterName,
          "pageNum": this.currentPage,
          "pageSize": this.pageSize
      }
      queryAll(req).then(resp => {
        this.featureList = resp.features
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
        this.featureList = resp.features
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
        this.featureList = resp.features
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
        this.featureList = resp.features
        this.total = resp.total
      })    
    },
    onExec(row){
      this.show = true
      this.row = row
      this.parameters = {}
      this.$refs.reqEditor && this.$refs.reqEditor._setValue('{}')
      this.$refs.respEditor && this.$refs.respEditor._setValue('{}')
    },
    onChange(value) {
      if(value){
        try {
          this.parameters = JSON.parse(value || '[]') 
        } catch (error) {
        }
      }
    },
    doDel(row){
      del(row.feature_id).then(resp => {
        this.loadFeaturnList()
        this.$message({
          message: resp.status && resp.status.success ? '删除成功' : '删除失败',
          type: resp.status && resp.status.success ? 'success' : 'error'
        });
      })
    },
    doExec(){
      let req = {
          "requestId": uuid(),
          "parameters": this.parameters,
          "featureId": this.row.feature_id
      }
      exec(req).then(resp => {
        this.$refs.respEditor && this.$refs.respEditor._setValue(jsonFormat(resp))
      })
    }
  }
}
</script>
