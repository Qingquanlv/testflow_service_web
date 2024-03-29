<template>
    <div class="detailPanel" :style="{'height':height+'px'}">
        <UserTaskDetail v-if="model.clazz === 'userTask'" :model="model" :onChange="onChange" :readOnly="readOnly" :users="users" :groups="groups" />
        <ScriptTaskDetail v-else-if="model.clazz === 'scriptTask'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <JavaTaskDetail v-else-if="model.clazz === 'javaTask'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <ReceiveTaskDetail v-else-if="model.clazz === 'receiveTask'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <MailTaskDetail v-else-if="model.clazz === 'mailTask'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <TimerEventDetail v-else-if="model.clazz === 'timerStart' || model.clazz === 'timerCatch'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <SignalEventDetail v-else-if="model.clazz === 'signalStart' || model.clazz === 'signalCatch'" :model="model" :onChange="onChange" :readOnly="readOnly" :signalDefs="signalDefs" />
        <MessageEventDetail v-else-if="model.clazz === 'messageStart' || model.clazz === 'messageCatch'" :model="model" :onChange="onChange" :readOnly="readOnly" :messageDefs="messageDefs" />
        <GatewayDetail v-else-if="model.clazz === 'gateway' || model.clazz === 'exclusiveGateway' || model.clazz === 'parallelGateway' || model.clazz === 'inclusiveGateway'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <FlowDetail v-else-if="model.clazz === 'flow'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <StartEventDetail v-else-if="model.clazz === 'start'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <EndEventDetail v-else-if="model.clazz === 'end'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <ProcessDetail v-else-if="model.clazz === 'process'" :model="model" :onChange="onChange" :readOnly="readOnly" :categorys="categorys" />
        <DatabaseDetail v-else-if="model.clazz === 'database'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <TiDBDetail v-else-if="model.clazz === 'tidb'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <DruidDetail v-else-if="model.clazz === 'druid'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <ParseDetail v-else-if="model.clazz === 'parse'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <RequestDetail v-else-if="model.clazz === 'request'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <VerificationDetail v-else-if="model.clazz === 'verification'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <ComparePathDetail v-else-if="model.clazz === 'compare_path'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <CompareObjDetail v-else-if="model.clazz === 'compare_obj'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <ConditionIfDetail v-else-if="model.clazz === 'condition_if'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <ConditionForDetail v-else-if="model.clazz === 'condition_for'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <SubFeatureDetail v-else-if="model.clazz === 'feature'" :model="model" :onChange="onChange" :readOnly="readOnly" />
    </div>
</template>
<script>
  import UserTaskDetail from "./UserTaskDetail"
  import JavaTaskDetail from "./JavaTaskDetail"
  import ScriptTaskDetail from "./ScriptTaskDetail"
  import ReceiveTaskDetail from "./ReceiveTaskDetail"
  import MailTaskDetail from "./MailTaskDetail"
  import TimerEventDetail from "./TimerEventDetail"
  import SignalEventDetail from "./SignalEventDetail"
  import MessageEventDetail from "./MessageEventDetail"
  import GatewayDetail from "./GatewayDetail"
  import FlowDetail from "./FlowDetail"
  import StartEventDetail from "./StartEventDetail"
  import EndEventDetail from "./EndEventDetail"
  import ProcessDetail from "./ProcessDetail"
  import DatabaseDetail from "./DatabaseDetail"
  import TiDBDetail from './TiDBDetail'
  import DruidDetail from './DruidDetail'
  import ParseDetail from "./ParseDetail"
  import RequestDetail from "./RequestDetail"
  import VerificationDetail from "./VerificationDetail"
  import ComparePathDetail from "./ComparePathDetail"
  import CompareObjDetail from "./CompareObjDetail"
  import ConditionIfDetail from "./ConditionIfDetail"
  import ConditionForDetail from "./ConditionForDetail"
  import SubFeatureDetail from "./SubFeatureDetail"
  export default {
    inject: ['i18n'],
    components:{
      UserTaskDetail,
      ScriptTaskDetail,
      JavaTaskDetail,
      ReceiveTaskDetail,
      MailTaskDetail,
      TimerEventDetail,
      SignalEventDetail,
      MessageEventDetail,
      GatewayDetail,
      FlowDetail,
      StartEventDetail,
      EndEventDetail,
      ProcessDetail,
      DatabaseDetail,
      TiDBDetail,
      DruidDetail,
      ParseDetail,
      RequestDetail,
      VerificationDetail,
      ComparePathDetail,
      CompareObjDetail,
      ConditionIfDetail,
      ConditionForDetail,
      SubFeatureDetail
    },
    props: {
      height: {
        type: Number,
        default: 800,
      },
      model: {
        type:Object,
        default: ()=>({}),
      },
      users: {
        type: Array,
        default: ()=>([]),
      },
      groups: {
        type: Array,
        default: ()=>([]),
      },
      categorys: {
        type: Array,
        default: ()=>([]),
      },
      signalDefs: {
        type: Array,
        default: ()=>([]),
      },
      messageDefs: {
        type: Array,
        default: ()=>([]),
      },
      onChange: {
        type: Function,
        default: ()=>{}
      },
      readOnly:{
        type: Boolean,
        default: false,
      }
    },
  }
</script>
<style lang="scss">
    .detailPanel {
        height: 100%;
        background: #f0f2f5;
        flex: 0 0 auto;
        float: left;
        width: 30%;
        border-right: 1px solid #E9E9E9;
        border-bottom: 1px solid #E9E9E9;
        .panelTitle {
            text-align: left;
            height: 32px;
            padding-left: 12px;
            color: #000;
            line-height: 28px;
            background: #EBEEF2;
            border-bottom: 1px solid #DCE3E8;
        }

        .panelBody {
            .panelRow {
                text-align: left;
                display: inline-block;
                font-size: 12px;
                width: 100%;
                padding: 5px 12px;
            }
        }
    }
</style>
