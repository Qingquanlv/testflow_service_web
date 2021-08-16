<template>
    <div :id="id" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
export default {
    data(){
        return{
            myChart:{}
        }
    },
    mounted(){
        this.init();
    },
    props:{
        option:'',
        id:''
    },
    methods: {
        init(){
            // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(document.getElementById(this.id))
            if(this.option){
                this.myChart.setOption(this.option)
            }
        },
        setOption(option){
            this.myChart.setOption(option)
        }
    }
}
</script>