<template>
  <common-page  title="处理待办">
     <template slot="content">
         <van-cell-group>
             <div class="group-title">报警信息</div>
             <van-field
                    v-model="title"
                    class="custom-van-cell"
                    label="标题"
                    placeholder="请输入标题"
              />
              <van-field
                    v-model="title"
                    class="custom-van-cell"
                    label="类型"
                    placeholder="请输入类型"
              />
              <van-field
                    v-model="title"
                    class="custom-van-cell"
                    label="等级"
                    placeholder="请输入等级"
              />
             <van-field
                    v-model="title"
                    class="custom-van-cell"
                    label="巡检时间"
                    placeholder="请输入巡检时间"
             /> 
             <van-field 
                    v-model="title"
                    class="custom-van-cell"
                    label="报警时间"
                    placeholder="请选择报警时间"
             /> 
         </van-cell-group>
         <van-cell-group>
             <div class="group-title">处理日志</div>
             <log-cell state="处理中" comment="无" date="2017-08-13"></log-cell>
             <log-cell state="已处理" comment="程序有bug,已修复" date="2017-08-13"></log-cell>
         </van-cell-group>
          <van-cell-group>
          <div class="group-title">处理意见</div>
           <PopSelect cellTitle="状态" class="cell-border" :value="dealValue" @confirm="pickerConfirm" :columns="columns"></PopSelect>
            <van-field
                    v-model="title"
                    label="备注"
                    class="custom-van-cell"
                    placeholder="简要描述问题根源，处理过程"
              />
         </van-cell-group>
         <van-button size="normal" class="mt-10 submit-btn">提交</van-button>
     </template>
  </common-page>
</template>

<script>
import { Cell, CellGroup, Field, Button } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import LogCell from '@/components/LogCell.vue';
import PopSelect from '@/components/PopSelect.vue';
export default {
  name: '',

  mixins: [],

  components: {
    CommonPage,
    LogCell,
    PopSelect,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  props: {},

  data() {
    return {
      title: '',
      dealValue: '',
      columns: [{ text: 'mysql' },
        { text: 'oracle' },
        { text: 'redis' }]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    pickerConfirm(value) {
      this.dealValue = value.text;
    }
  }
};
</script>

<style lang="scss" scoped>
.group-title{
  background:#efefef;
  color:#7a7d81;
  padding:10px 12px;
}

</style>
 <style scoped>
  .submit-btn{
       width:90%;
       margin:0 auto;
       background: #3296fa;
       display: block;
       color:#fff;
       margin-top:10px;
  }
</style>