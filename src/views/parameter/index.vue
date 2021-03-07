<template>
  <div class="app-container">
    <edit type="add" :item="{}" @reload="fetchData" />
    <hr>
    <el-table size="mini"
      v-loading="loading"
      :data="list"
      element-loading-text="Loading..."
      fit
    >
      <el-table-column align="center" label="#" width="95"  type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.parameters" border style="width: 100%">
            <el-table-column prop="parameter_key" label="Key" width="180">
            </el-table-column>
            <el-table-column prop="parameter_value" label="Value">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="参数名">
        <template slot-scope="scope">
          {{ scope.row.parameter_name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <edit type="edit" :item="scope.row" @reload="fetchData" />
          <el-button type="text" icon="el-icon-delete" style="margin-left:10px;color:red" @click="onDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import edit from './edit'
import { queryAll, deleteByName } from '@/api/parameter'

export default {
  components:{edit},
  data() {
    return {
      list: null,
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      queryAll().then(resp => {
        this.loading = false
        this.list = resp.parameters
      })
    },
    onDelete(item){
      this.loading = true
      deleteByName({name:item.parameter_name}).then(resp => {
        this.loading = false
        this.fetchData()
      })
    }
  }
}
</script>
