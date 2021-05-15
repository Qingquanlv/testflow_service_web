<template>
  <div>
    <span>{{ title }}</span>
    <hr v-show="title && title != ''"/>
    <el-input v-show="showAddRootBtn || showSaveBtn || showRefreshBtn" size="mini" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <p v-show="showAddRootBtn || showSaveBtn || showRefreshBtn"/>
    <el-button type="primary" size="mini" icon="el-icon-plus" @click="onAddRootNode" v-show="showAddRootBtn">添加根节点</el-button>
    <el-button type="primary" size="mini" icon="el-icon-coin" @click="onSaveTree"  v-show="showSaveBtn">保存</el-button>
    <el-button type="primary" size="mini" icon="el-icon-refresh" @click="onTreeRefresh" v-show="showRefreshBtn">刷新</el-button>
    <el-tree :style='{"height": treeHeight}'
      ref="ctree"
      :data="data"
      :show-checkbox="showCheckBox"
      node-key="id"
      @node-click="onNodeClick"
      :default-expand-all="defaultExpandAll"
      :filter-node-method="filterNode"
      :highlight-current="true"
      :expand-on-click-node="expandOnClickNode"
      :check-on-click-node="checkOnClickNode"
      :default-checked-keys="defaultCheckedKeys"
      draggable
      @check="onCheck"
      :check-strictly="false"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }" style="width: 100%;">
        <span style="width:300px;display:inline-block;overflow: hidden;">{{ node.label }}</span>
        <span v-show="showCustomTreeNode" style="display:inline-block;float:right">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<style>

</style>


<script>
  export default {
    data() {
      return {
        filterText:'',
        randomId : -999
      }
    },
    props: {
      title: {
        type: String,
      },
      treeHeight:{
        type: String,
        default:function(){
          return ''
        }
      },
      data: {
        type: Array,
        default: function() {
          return []
        }
      },
      showCustomTreeNode:{
        type: Boolean,
        default :function(){
          return true
        }
      },
      showAddRootBtn:{
        type: Boolean,
        default :function(){
          return false
        }
      },
      showSaveBtn:{
        type: Boolean,
        default :function(){
          return false
        }
      },
      showRefreshBtn:{
        type: Boolean,
        default :function(){
          return false
        }
      },
      defaultExpandAll:{
        type: Boolean,
        default :function(){
          return true
        }
      },
      showCheckBox:{
        type: Boolean,
        default :function(){
          return false
        }
      },
      defaultCheckedKeys:{
        type: Array,
        default:function(){
          return []
        }
      },
      expandOnClickNode:{
        type : Boolean,
        default: function(){
          return false
        }
      },
      checkOnClickNode:{
        type : Boolean,
        default: function(){
          return false
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.ctree.filter(val)
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      append(node,data) {
        const newChild = { id: this.randomId--, parentId: data.id, label: 'new',name:'new', children: [] }
        this.$refs.ctree.append(newChild,data)
      },
      remove(node, data) {
        //弹窗确认
        this.$confirm(`此操作将永久删除【${node.label}】节点, 是否继续?`, '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.ctree.remove(node)
          //调接口删除
          this.onNodeDelete(node, data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
      },
      onSaveTree(){
        let keys = []
        // this.$refs.ctree.getHalfCheckedKeys().map(key => {
        //   keys.push(key)
        // })
        this.$refs.ctree.getCheckedKeys().map(key => {
          keys.push(key)
        })
        this.$emit('onSaveTree',keys)
      },
      onCheck(){
        let keys = []
        this.$refs.ctree.getCheckedKeys().map(key => {
          keys.push(key)
        })
        let halfKeys = []
        this.$refs.ctree.getHalfCheckedKeys().map(key => {
          halfKeys.push(key)
        })
        this.$emit('onTreeNodeChecked',{'keys':keys, 'halfKeys': halfKeys})
      },
      onAddRootNode(){
        const rootNode = { id: this.randomId--, parentId: 0, label: 'new', name: 'new',children: [] }
        this.$refs.ctree.append(rootNode)
      },
      onNodeDelete(node, data){
        //父组件处理成功或失败提示消息
        this.$emit('onNodeDelete', node, data)
      },
      onNodeClick(data,node,event){
        this.$emit('onNodeClick',data,node)
      },
      onTreeRefresh(){
        this.$emit('onTreeRefresh')
      },
      //--- 拖动事件 start ---//
      handleDragStart(node, ev) {
        
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        
      },
      handleDragOver(draggingNode, dropNode, ev) {
        
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        //console.log('onNodeDrop')
      },
      allowDrop(draggingNode, dropNode, type) {
        return true
      },
      allowDrag(draggingNode) {
        return true
      }
      //--- 拖动事件 end ---//

    }
  }
</script>
<style>

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-node__expand-icon.is-leaf{
  width:0px !important;
  padding: 2px !important;
}
.el-tree{
  padding-top: 5px !important;
}
</style>

