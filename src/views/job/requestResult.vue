<template>
  <div
    ref="container"
    class="monaco-editor"
    :style="`height: ${height}px`"
  ></div>
</template>


<script>
import * as monaco from 'monaco-editor'
export default {
name: 'RequestReslutMonacoEditor',
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
    data () {
        return {
            show:false,
            // 主要配置
            defaultOpts: {
                value: '', // 编辑器的值
                theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
                roundedSelection: true, // 右侧不显示编辑器预览框
                autoIndent: true // 自动缩进
            },
            // 编辑器对象
            monacoDiffInstance: {}
        }
    },
    watch: {
        opts: {
        handler () {
            this.init()
        },
        deep: true
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
        // 初始化container的内容，销毁之前生成的编辑器
            this.$refs.container.innerHTML = ''
            // 生成编辑器配置
            let editorOptions = Object.assign(this.defaultOpts, this.opts)
            editorOptions.readOnly = true;
            editorOptions.language = 'javascript'
            // 初始化编辑器实例
            this.monacoDiffInstance = monaco.editor.createDiffEditor(this.$refs['container'],editorOptions)
            this.monacoDiffInstance.setModel({
                // oldValue为以前的值
                original: monaco.editor.createModel("just some text\n\nHello World\n\nSome more text\nSome more text", editorOptions.language),
                // oldValue为新的值
                modified: monaco.editor.createModel("just some Text\n\nHello World\n\nSome more changes\nSome more text", editorOptions.language)
            })
        },
        // 供父组件调用手动获取值
        getVal () {
            return this.monacoDiffInstance.getValue()
            }
        }
    }
</script>
