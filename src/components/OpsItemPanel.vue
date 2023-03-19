<template>
    <div class="itemPanel" :style="{'height': height+'px'}">
        <el-collapse v-model="activeNames" >
            <el-collapse-item :title="i18n['sonar']" name="1">
                <img :data-item="sonarTaskData"
                     :src="require('../assets/flow/mail-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['sonarTask']}}</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
  export default {
    inject: ['i18n'],
    props: {
      height: {
        type: Number,
        default: 800,
      },
    },
    data() {
      return {
        activeNames: ['1'],
        sonarTaskData: "{clazz:'sonar',size:'80*44',label:'"+this.i18n['sonarTask']+"'}"
      };
    },
  }
</script>

<style lang="scss" >
    .itemPanel {
        float: left;
        width: 10%;
        background: #f0f2f5;
        overflow-y: auto;
        border-left: 1px solid #E9E9E9;
        border-bottom: 1px solid #E9E9E9;
        img{
            width: 92px;
            height: 96px;
            padding: 4px;
            border: 1px solid rgba(0,0,0,0);
            border-radius: 2px;
            &:hover{
                border: 1px solid #ccc;
                cursor: move;
            }
        }
        .el-collapse {
            border: 0;
            .el-collapse-item {
                > div[role=tab] > div {
                    padding-left: 10px;
                    border: 1px solid #E9E9E9;
                    border-left:0;
                }
                &:first-child{
                    > div[role=tab] > div {
                        border-top: 0;
                    }
                }
                &:last-child{
                    > div[role=tab] > div {
                        border-bottom: 1px solid #E9E9E9;
                    }
                }
                .el-collapse-item__wrap{
                    border-top: 0;
                    background: #f0f2f5;
                    text-align: center;
                }
            }
        }

    }
</style>
