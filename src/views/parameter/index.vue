<template>
    <div>
        <el-row :gutter="5">
            <el-col :span="5">
              <el-card class="index-card">
                <span>参数列表</span> 
                  <hr/> 
                    <el-input
                      placeholder="输入关键字进行过滤"
                      v-model="filterText">
                    </el-input>
                    <el-tree
                      class="filter-tree"
                      :data="resTreeData"
                      @node-click="onNodeClick"
                      @onTreeRefresh="onTreeRefresh" 
                      @onNodeDelete="onNodeDelete"
                      ref="tree">
                    </el-tree>
                    <el-pagination background small :pager-count="5" @current-change="handleCurrentChange"
                      :current-page.sync="appUserRel.page" :page-size="appUserRel.limit"
                      layout="total, prev, pager, next, jumper" :total="appUserRel.total">
                    </el-pagination>     
                </el-card>
            </el-col>
            <el-col :span="19">
              <el-card class="info-card" >
                  <span>参数配置</span> 
                  <el-button type="primary" style="float:right;margin-right:6px;" size="small" icon="el-icon-document" @click="doSave()">保存</el-button>
                  <el-button type="primary" style="float:right;margin-right:6px;" size="small" icon="el-icon-document" @click="doDelete()">删除</el-button>
                  <el-button type="primary" style="float:right;margin-right:6px;" size="small" icon="el-icon-document" @click="doCreate()">新增</el-button>
              </el-card>
                <el-card class="table-card">
                  <div>     
                    <div>
                      <el-form :model="item" size="small" ref="editFrom" label-width="90px" >
                        <el-form-item label="参数名称" prop="name" verify class="is-required">
                          <el-input v-model="item.name"></el-input>
                        </el-form-item>
                      </el-form>
                      <el-row style="width:100%;height:730px;padding:0px 0px 20px 20px;">
                        <hot-table ref="hotTableComponent" :settings="hotSettings"></hot-table>
                      </el-row>
                    </div>
                  </div>
                </el-card>
            </el-col>
        </el-row> 
    </div>  
</template>


<script>
import { deepCopy, uuid } from '@/utils/CommonUtil'
import { queryAll, query, deleteById, update } from '@/api/parameter'
import { HotTable, HotColumn } from '@handsontable/vue';
import Handsontable from 'handsontable';

export default {
  data() {
    return {
      hotSettings: {
        width: '100%',
        height: '100%',
        data: [],
        colHeaders: true,
        rowHeaders: true,
        rowHeaders(index) {
          if (index == 0)
            return 'Keys'
          else  
            return index;
        },
        contextMenu: {
          items: {
            "col-left": {
            name: "Insert column",
            callback: (function() {
                var getCol = this.getColHeader();
                var colIndex = this.getSelected()[1];
                //getCol.splice(colIndex-1, 0 , {});
                getCol.unshift({});
                console.log(getCol)
                this.updateSettings({
                  columns: getCol,
                  data: this.getData()
                })
              }),
            },
            'make_read_only': {},
            'alignment': {},
            'row_above': {
              name: 'Insert row above this one (custom name)'
            },
            'row_below': {},
            'separator': Handsontable.plugins.ContextMenu.SEPARATOR,
            'clear_custom': {
              name: 'Clear all cells (custom)',
              callback() {
                this.clear();
              }
            }
          }
        },
        licenseKey: 'non-commercial-and-evaluation'
      },
      cols:[
              {
                data: 'car'
                // 1nd column is simple text, no special options here
              },
              {
                data: 'year',
                type: 'numeric'
              },
              {
                data: 'price_usd',
                type: 'numeric',
                format: '$0,0.00',
                language: 'en-US' // this is the default locale, set up for USD
              },
              {
                data: 'price_eur',
                type: 'numeric',
                format: '0,0.00 $',
                language: 'de-DE' // i18n: use this for EUR (German)
                // more locales available on http://numbrojs.com/languages.html
              }
            ],
      item : {},
      resTreeData : [],
      currentNodeId:null,
      filterText: '',
      appUserRel: {
        limit: 27,
        total: 20,
        page: 1
      }     
    }
  },
  created() {
      this.initResTree()
  },
  components: {
    HotTable,
    HotColumn
  },
  watch:{
    filterText() {
        this.filterNode();
    }
  },
  methods : {
      filterNode() {
        this.appUserRel.page = 1;
        this.initResTree();
      },
      initResTree(){
        let req = {
          "filter": this.filterText,
          "pageNum": this.appUserRel.page,
          "pageSize": this.appUserRel.limit
        }
        queryAll(req).then((data) => {
            this.resTreeData = data.parameters.map(x => {
              return {
                ...x,
                id: x.id,
                parentId:0,
                label: x.parameter_name,
                name: x.parameter_name
              }
            })
            this.appUserRel.total = data.total
        }).catch(() =>{
            this.$message({
                type: 'error',
                message: '请求失败!'
            })
        })
      },
      insertright() {
        var getCol = hot.getSelected()[1];
        var getColSet = this.cols.length;
        this.cols.push({});
        arraymove(cols, getColSet, getCol + 1);
        hot.updateSettings({
          columns: cols
        })
      },
      onTreeRefresh(){
        this.initResTree()
      },
      onNodeClick(data, node){
        data.show = data.show
        data.keepAlive = data.keepAlive
        data.target = data.target || 'tab'
        query({id:data.id}).then((resp) => {
          var rowKeys = {}
          var keys = new Array();
          var objKeys = [];
          if(resp!=null && resp.parameters!=null && resp.parameters.length>0){
            for(var i in resp.parameters){
              for (let key of Object.keys(resp.parameters[i])) {
                rowKeys[key] = key
                if (!keys.includes(key)) {
                  var object = {};
                  keys.push(key);
                  object['data']=key;
                  objKeys.push(object);
                }
              }
            }
          }
          this.item = deepCopy(data)
          resp.parameters.unshift(rowKeys)
          this.$refs.hotTableComponent.hotInstance.updateSettings({
            columns: objKeys,
            data: resp.parameters
          })
          this.currentNodeId = data.id
        })
      },
      onNodeDelete(node, data){
        if(!data || (data.children && data.children.length > 0)){
            this.$message({
                type: 'error',
                message: '该节点存在子节点,不可直接删除!'
            })
            this.initResTree()
        } else {
            deleteByName({name:data.name}).then((resp) =>{
                this.$message({
                    type: resp.status.success ? 'success' : 'error',
                    message: resp.status.success ? '删除成功' : `[${resp.errorCode}]:[${resp.status.message}]:删除失败!`
                })
                this.initResTree()
            })
        }
      },
      doCreate(data, node){
          this.currentNodeId=null
          this.item.name = ''
          this.$refs.hotTableComponent.hotInstance.updateSettings({
              data: [[]],
              minRows: 50,
              minCols: 26,
              columns:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
            })
      },
      doDelete(){
          deleteById({id:this.currentNodeId}).then(resp => {
              this.$message({
                  type: resp.status.success ? 'success' : 'error',
                  message: resp.status.success ? '删除成功' : `[${resp.errorCode}]:[${resp.status.message}]:删除成功!`
              })
              this.initResTree()
              this.currentNodeId=null
              this.item.name = ''
              this.$refs.hotTableComponent.hotInstance.updateSettings({
                  data: [[]],
                  minRows: 50,
                  minCols: 26,
                  columns:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
                })
          })
      },
      doSave(){
          var group = this.$refs.hotTableComponent.hotInstance.getData()
          var parameters = []
          if(group!=null && group.length>0){
            for(var i = 1; i < group.length; i++) {
              var object = {};
              for(var j = 0; j < group[i].length; j++) {
                if (null!=group[0][j] && null!=group[i][j]) {
                  object[group[0][j]]=group[i][j]
                }
              }
              parameters.push(object)
            }
          }
          let req = {
              requestId: uuid(),
              parameterId: this.currentNodeId,
              parameterName: this.item.name,
              parameters: parameters || []
          }
          update(req).then(resp => {
              this.$message({
                  type: resp.status.success ? 'success' : 'error',
                  message: resp.status.success ? '保存成功' : `[${resp.errorCode}]:[${resp.status.message}]:保存失败!`
              })
              this.currentNodeId = resp.parameterId;
              this.initResTree()
          })
      },
      handleCurrentChange(val) {
            this.appUserRel.page = val
            let req = {
              "filter": this.filterText,
              "pageNum": this.appUserRel.page,
              "pageSize": this.appUserRel.limit
            }
            queryAll(req).then((data) => {
                this.resTreeData = data.parameters.map(x => {
                  return {
                    ...x,
                    id: x.id,
                    parentId:0,
                    label: x.parameter_name,
                    name: x.parameter_name
                  }
                })
                this.appUserRel.total = data.total
            }).catch(() =>{
                this.$message({
                    type: 'error',
                    message: '请求失败!'
                })
            })
        }
  }
}
</script>

<style>
  .index-card {
    width: 100%;
    height: 860px;
  }
  .table-card {
    height: 800px;
    width: 100%;
  }
  .info-card {
    height: 60px;
    width: 100%;
  }
  .filter-tree {
    width: 100%;
    height: 720px;
  }
</style>
