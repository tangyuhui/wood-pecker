<template>
  <common-page  title="新建监控">
     <template slot="content">
          <van-cell-group>
             <div class="group-title">基本信息</div>
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
            <van-switch-cell  class="custom-van-cell long-title" v-model="checked" title="强制处理反馈" />
         </van-cell-group>
         <van-cell-group>
             <div class="group-title">变量设置</div>
             <CSwipeCell v-for="(item) in varList"   :key="item.id" :title="item.title" editOne="编辑" editTwo="删除" @select="(option)=>onVarMulSelect(option,item)" @handleOneEvent="handleVarEdit(item)" @handleTwoEvent="handleVarDelete(item)">
             </CSwipeCell>
             <div class="mul-area"><div class="add-btn" @click="addVariable">+</div></div>
         </van-cell-group>
         <van-cell-group>
             <div class="group-title">触发条件</div>
             <CSwipeCell  v-for="(item) in conditionList" :key="item.id" :title="item.title" editOne="编辑" editTwo="删除" @select="(option)=>onConditionMulSelect(option,item)" @handleOneEvent="handleConditionEdit(item)" @handleTwoEvent="handleConditionDelete(item)">
             </CSwipeCell>
             <div class="mul-area"><div class="add-btn" @click="addCondition">+</div></div>
         </van-cell-group>
         <van-cell-group>
             <div class="group-title">提示语</div>
              <van-field
              v-model="variableInput"
              type="textarea"
              autosize
              placeholder="请输入提示语"
            />
         </van-cell-group>
         <van-cell-group>
             <div class="group-title">订阅者</div>
             <div class="subscriber-list">
                <div class="subscriber-item" v-for="index in 10" :key="index">
                  <img src="./img/avator.png" alt="">
                </div>
                <div class="subscriber-item">
                   <div class="add-subscriber">+</div>
                </div>
             </div>
         </van-cell-group>

         <div class="dialog-area">
           <van-dialog
            v-model="varDialogShow"
            show-cancel-button
            className="dialog"
            :before-close="varBeforeClose"
          >
            <van-field
              v-model="variableInput"
              type="textarea"
              autosize
              placeholder="请输入变量"
            />
          </van-dialog>
          <van-dialog
            v-model="conditionDialogShow"
            show-cancel-button
            className="dialog"
            :before-close="conditionBeforeClose"
           >
            <van-field
              v-model="conditionInput"
              type="textarea"
              autosize
              placeholder="请输入触发条件"
            />
          </van-dialog>
         </div>
        
         <van-button size="normal" class="submit-btn">提交</van-button>
     </template>
  </common-page>
</template>

<script>
import { Cell, CellGroup, Field, Button, SwitchCell } from 'vant';
import CSwipeCell from '@/components/CSwiperCell';
import CommonPage from '@/components/common/CommonPage.vue';
import LogCell from '@/components/LogCell.vue';
import PopSelect from '@/components/PopSelect.vue';
import { mapMutations } from 'vuex';
import { UPDATE_BOTTOM_BAR_SHOW } from '@/store/mutation-types.js';
export default {
  name: 'createMonitor',

  mixins: [],

  components: {
    CommonPage,
    LogCell,
    PopSelect,
    CSwipeCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [SwitchCell.name]: SwitchCell
  },
  props: {},

  data() {
    return {
      checked: false,
      title: '',
      dealValue: '',
      varList: [{ title: 'select * from user', id: 1 }, { title: 'select * from dep', id: 2 }],
      conditionList: [{ title: 'a.total>0', id: 1 }, { title: 'a.total<12', id: 2 }],
      columns: [{ text: 'mysql' },
        { text: 'oracle' },
        { text: 'redis' }],
      varDialogShow: false,
      variableInput: '',
      conditionDialogShow: false,
      conditionInput: '',
      curVar: null,
      curCondition: null,
      conditionUid: 0,
      varUid: 0
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapMutations([UPDATE_BOTTOM_BAR_SHOW]),
    pickerConfirm(value) {
      this.dealValue = value.text;
    },
    handleVarEdit(item) {
      this.curVar = item;
      this.variableInput = item.title;
      this.varDialogShow = true;
    },
    handleConditionEdit(item) {
      this.curCondition = item;
      this.conditionInput = item.title;
      this.conditionDialogShow = true;
    },
    handleConditionDelete(item) {
      const index = this.conditionList.findIndex((element) => { return element.id === item.id; });
      if (index === -1) {
        return;
      } else {
        this.conditionList.splice(index, 1);
      }
    },
    handleVarDelete(item) {
      const index = this.varList.findIndex((element) => { return element.id === item.id; });
      if (index === -1) {
        return;
      } else {
        this.varList.splice(index, 1);
      }
    },
    onVarMulSelect(option, item) {
      if (option.name === '编辑') {
        this.handleVarEdit(item);
      } else if (option.name === '删除') {
        this.handleVarDelete(item);
      }
    },
    onConditionMulSelect(option, item) {
      if (option.name === '编辑') {
        this.handleConditionEdit(item);
      } else if (option.name === '删除') {
        this.handleConditionDelete(item);
      }
    },
    varBeforeClose(action, done) {
      if (action === 'confirm' && this.variableInput !== '') {
        if (this.curVar) {
          // 编辑
          this.curVar.title = this.variableInput;
        } else {
          // 新增
          this.varList.push({ title: this.variableInput, id: 'add' + (this.varUid++) });
        }
        this.curVar = null;
        this.variableInput = '';
        done();
      } else {
        done();
      }
    },
    conditionBeforeClose(action, done) {
      if (action === 'confirm' && this.conditionInput !== '') {
        if (this.curCondition) {
          // 编辑
          this.curCondition.title = this.conditionInput;
        } else {
          // 新增
          console.log(this.conditionList);
          this.conditionList.push({ title: this.conditionInput, id: 'add' + (this.conditionUid++) });
        }
        this.curCondition = null;
        this.conditionInput = '';
        done();
      } else {
        done();
      }
    },
    addVariable() {
      this.varDialogShow = true;
    },
    addCondition() {
      this.conditionDialogShow = true;
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
 .submit-btn{
  width:90%;
  margin:20px auto;
  background: #3296fa;
  display: block;
  color:#fff;
 }
 .drag-ball{
    position:absolute;
    top:3%;
    right:5%;
    width:60px;
    height:60px;
    border-radius: 50%;
    border:1px solid #6bb2f9;
    background:#fff;
    text-align: center;
    line-height:60px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
    font-size:14px;
    color:#5296d2;
  }
  .add-btn{
    width:30px;
    height:30px;
    display:block;
    text-align: center;
    line-height:28px;
    border:1px solid #999;
    color:#999;
    border-radius: 50%;
    font-size: 16px;
    margin:0 auto;
  }
  .mul-area{
    padding:10px;
    background: #fff;
  }
.subscriber-list{
  width:100%;
  overflow-x: auto;
  padding:10px;
  display: flex;
  justify-content:flex-start;
  flex-wrap:wrap;
 .subscriber-item{
    margin:0 10px 10px 0;
    width:50px;
    height:50px;
    background:rgba(25,31,37,0.08);
    border-radius: 50%;
    img{
      height:100%;
      width:100%;
    }
    .add-subscriber{
      height:100%;
      width:100%;
      font-size: 20px;
      line-height:50px;
      text-align: center;
      color:#999;
    }
  }
}
 
</style>
 <style lang="scss">
  .long-title{
    .van-cell__title{
        max-width: 120px
    }
  }
</style>