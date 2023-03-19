<template>
    <div>
        <div class="panelRow">
            <div>{{i18n['label']}}：</div>
            <el-input size="small"
                      style="width:90%; font-size:12px"
                      :disabled="readOnly"
                      :value="model.label"
                      @input="(value) => {onChange('label', value)}" />
        </div>
    </div>
</template>
<script>
  export default {
    inject: ['i18n'],
    props: {
      model: {
        type:Object,
        default: ()=>({}),
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
