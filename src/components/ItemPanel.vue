<template>
    <div class="itemPanel" :style="{'height': height+'px'}">
        <el-collapse v-model="activeNames" >
            <el-collapse-item :title="i18n['request']" name="1">
                <img :data-item="requestTaskData"
                     :src="require('../assets/flow/mail-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['requestTask']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['database']" name="2">
                 <img :data-item="databaseTaskData"
                     :src="require('../assets/flow/script-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['databaseTask']}}</div>
                <img :data-item="tidbTaskData"
                     :src="require('../assets/flow/script-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['tidbTask']}}</div>
                <img :data-item="druidTaskData"
                     :src="require('../assets/flow/script-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['druidTask']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['parse']" name="3">
                 <img :data-item="parseTaskData"
                     :src="require('../assets/flow/java-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['parseTask']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['verification']" name="4">
                 <img :data-item="verificationTaskData"
                     :src="require('../assets/flow/receive-task.svg')" style="width:80px;height:44px" />
                 <div>{{i18n['verificationTask']}}</div>
                 <img :data-item="comparePathTaskData"
                     :src="require('../assets/flow/receive-task.svg')" style="width:80px;height:44px" />
                 <div>{{i18n['comparePathTask']}}</div>
                 <img :data-item="compareObjTaskData"
                     :src="require('../assets/flow/receive-task.svg')" style="width:80px;height:44px" />
                 <div>{{i18n['compareObjTask']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['condition']" name="5">
                 <img :data-item="conditionIfTaskData"
                     :src="require('../assets/flow/inclusive-gateway.svg')" style="width:80px;height:44px" />
                 <div>{{i18n['conditionIfTask']}}</div>
                 <img :data-item="conditionForTaskData"
                     :src="require('../assets/flow/inclusive-gateway.svg')" style="width:80px;height:44px" />
                 <div>{{i18n['conditionForTask']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['subfeature']" name="6">
                 <img :data-item="subFeatureTaskData"
                     :src="require('../assets/flow/gateway.svg')" style="width:80px;height:44px" />
                 <div>{{i18n['subFeatureTask']}}</div>
            </el-collapse-item>
            <!-- <el-collapse-item :title="i18n['start']" name="1">
                <img data-item="{clazz:'start',size:'30*30',label:''}"
                     :src="require('../assets/flow/start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['startEvent']}}</div>
                <img data-item="{clazz:'timerStart',size:'30*30',label:''}"
                     :src="require('../assets/flow/timer-start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['timerEvent']}}</div>
                <img data-item="{clazz:'messageStart',size:'30*30',label:''}"
                     :src="require('../assets/flow/message-start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['messageEvent']}}</div>
                <img data-item="{clazz:'signalStart',size:'30*30',label:''}"
                     :src="require('../assets/flow/signal-start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['signalEvent']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['task']" name="2">
                <img :data-item="userTaskData"
                     :src="require('../assets/flow/user-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['userTask']}}</div>
                <img :data-item="scriptTaskData"
                     :src="require('../assets/flow/script-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['scriptTask']}}</div>
                <img :data-item="javaTaskData"
                     :src="require('../assets/flow/java-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['javaTask']}}</div>
                <img :data-item="mailTaskData"
                     :src="require('../assets/flow/mail-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['mailTask']}}</div>
                <img :data-item="receiveTaskData"
                     :src="require('../assets/flow/receive-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['receiveTask']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['gateway']" name="3">
                <img data-item="{clazz:'exclusiveGateway',size:'40*40',label:''}"
                     :src="require('../assets/flow/exclusive-gateway.svg')" style="width:48px;height:48px" />
                <div>{{i18n['exclusiveGateway']}}</div>
                <img data-item="{clazz:'parallelGateway',size:'40*40',label:''}"
                     :src="require('../assets/flow/parallel-gateway.svg')" style="width:48px;height:48px" />
                <div>{{i18n['parallelGateway']}}</div>
                <img data-item="{clazz:'inclusiveGateway',size:'40*40',label:''}"
                     :src="require('../assets/flow/inclusive-gateway.svg')" style="width:48px;height:48px" />
                <div>{{i18n['inclusiveGateway']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['catch']" name="4">
                <img data-item="{clazz:'timerCatch',size:'50*30',label:''}"
                     :src="require('../assets/flow/timer-catch.svg')" style="width:58px;height:38px" />
                <div>{{i18n['timerEvent']}}</div>
                <img data-item="{clazz:'messageCatch',size:'50*30',label:''}"
                     :src="require('../assets/flow/message-catch.svg')" style="width:58px;height:38px" />
                <div>{{i18n['messageEvent']}}</div>
                <img data-item="{clazz:'signalCatch',size:'50*30',label:''}"
                     :src="require('../assets/flow/signal-catch.svg')" style="width:58px;height:38px" />
                <div>{{i18n['signalEvent']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['end']" name="5">
                <img data-item="{clazz:'end',size:'30*30',label:''}"
                     :src="require('../assets/flow/end.svg')" style="width:42px;height:42px" />
                <div>{{i18n['endEvent']}}</div>
            </el-collapse-item> -->
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
        databaseTaskData: "{clazz:'database',size:'80*44',label:'"+this.i18n['databaseTask']+"'}",
        tidbTaskData: "{clazz:'tidb',size:'80*44',label:'"+this.i18n['tidbTask']+"'}",
        druidTaskData: "{clazz:'druid',size:'80*44',label:'"+this.i18n['druidTask']+"'}",
        parseTaskData: "{clazz:'parse',size:'80*44',label:'"+this.i18n['parseTask']+"'}",
        requestTaskData: "{clazz:'request',size:'80*44',label:'"+this.i18n['requestTask']+"'}",
        verificationTaskData: "{clazz:'verification',size:'80*44',label:'"+this.i18n['verificationTask']+"'}",
        comparePathTaskData: "{clazz:'compare_path',size:'80*44',label:'"+this.i18n['comparePathTask']+"'}",
        compareObjTaskData: "{clazz:'compare_obj',size:'80*44',label:'"+this.i18n['compareObjTask']+"'}",
        conditionIfTaskData: "{clazz:'condition_if',size:'80*44',label:'"+this.i18n['conditionIfTask']+"'}",
        conditionForTaskData: "{clazz:'condition_for',size:'80*44',label:'"+this.i18n['conditionForTask']+"'}",
        subFeatureTaskData: "{clazz:'feature',size:'80*44',label:'"+this.i18n['subFeatureTask']+"'}"
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
