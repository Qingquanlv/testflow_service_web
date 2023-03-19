<template>
  <el-dialog title="查看文件" :visible.sync="innerVisible" class="form-dialog" center @closed="onClosed">
  </el-dialog>
</template>
 
<script>
export default {
  name: 'FileListDialog',
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerVisible: this.visible,
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val === oldVal) {
        return
      }
      this.innerVisible = val
    },
    innerVisible(val, oldVal) {
      if (val === oldVal) {
        return
      }
      this.$emit('update:visible', val)
    }
  },
  mounted() {},
  updated() {
    this.dVisible = this.dialogFormVisible
  },
  methods: {
  }
}
</script>
 
<style></style>