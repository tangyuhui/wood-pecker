<template>
  <common-page  title="新建监控">
     <template slot="content">
          <van-cell-group>
             <div class="group-title">基本信息</div>
             <van-field
                    v-model="form.title"
                    class="custom-van-cell"
                    label="标题"
                    placeholder="请输入标题"
              />
            <PopSelect cellTitle="类型" class="cell-border"  v-model="form.categoryId" :columns="categoryIdColumns" value-key="title" :value-code="'id'"></PopSelect>
            <PopSelect cellTitle="等级" class="cell-border"  v-model="form.level" :columns="levelColumns" value-key="desc"></PopSelect>  
            <PopDatePicker cellTitle="巡检时间" class="cell-border" v-model="form.checkCorn" ></PopDatePicker>
            <van-switch-cell  class="custom-van-cell long-title" v-model="form.needTreat" title="强制处理反馈" />
         </van-cell-group>
    
         <van-cell-group>
             <div class="group-title">变量设置</div>
             <CSwipeCell v-for="(item) in form.variables"   :key="item.id" :title="formatVar(item)" editOne="编辑" editTwo="删除" @select="(option)=>onVarMulSelect(option,item)" @handleOneEvent="handleVarEdit(item)" @handleTwoEvent="handleVarDelete(item)">
             </CSwipeCell>
             <div class="mul-area"><div class="add-btn" @click="addVariable">+</div></div>
         </van-cell-group>
         <van-cell-group>
             <div class="group-title">触发条件</div>
             <CSwipeCell  v-for="(item) in form.triggers" :key="item.id" :title="formatTriggers(item)" editOne="编辑" editTwo="删除" @select="(option)=>onConditionMulSelect(option,item)" @handleOneEvent="handleConditionEdit(item)" @handleTwoEvent="handleConditionDelete(item)">
             </CSwipeCell>
             <div class="mul-area"><div class="add-btn" @click="addCondition">+</div></div>
         </van-cell-group>
         <van-cell-group>
             <div class="group-title">提示语</div>
              <van-field
              v-model="form.message"
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
           <PopSelect cellTitle="数据库" class="cell-border"  v-model="addvariables.dbConnectionId" :columns="dbListColumns" value-key="name" value-code="id"></PopSelect>  
           <van-field
                v-model="addvariables.name"
                clearable
                label="变更名"
                  class="custom-van-cell"
                placeholder="请输入变更名"
           />
            <van-field
              v-model.trim="addvariables.script"
              type="textarea"
               label="脚本"
                 class="custom-van-cell"
              autosize
              placeholder="请输入脚本"
            />
          </van-dialog>
          <van-dialog
            v-model="conditionDialogShow"
            show-cancel-button
            className="dialog"
            :before-close="conditionBeforeClose"
           >
           <van-field
                v-model.trim="addConditions.ascript"
                type="textarea"
                label="脚本a"
                  class="custom-van-cell"
                autosize
                placeholder="请输入脚本a"
            />
            <PopSelect cellTitle="比较运行符" class="cell-border"  v-model="addConditions.operator" :columns="assertOperatorColumns" value-key="desc"></PopSelect>  
            <van-field
                v-model.trim="addConditions.bscript"
                type="textarea"
                label="脚本b"
                  class="custom-van-cell"
                autosize
                placeholder="请输入脚本b"
              />
          </van-dialog>
         </div>
         <van-button size="normal" class="submit-btn" @click="submit">提交</van-button>
     </template>
  </common-page>
</template>

<script>
import { Cell, CellGroup, Field, Button, SwitchCell } from 'vant';
import CSwipeCell from '@/components/CSwiperCell';
import CommonPage from '@/components/common/CommonPage.vue';
import LogCell from '@/components/LogCell.vue';
import PopSelect from '@/components/PopSelect.vue';
import PopDatePicker from '@/components/PopDatePicker';
import { mapMutations } from 'vuex';
import { UPDATE_BOTTOM_BAR_SHOW } from '@/store/mutation-types.js';
import api from '@/api';
import * as util from '@/script/util';
export default {
  name: 'createMonitor',

  mixins: [],

  components: {
    CommonPage,
    LogCell,
    PopSelect,
    PopDatePicker,
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
      categoryIdColumns: [],
      levelColumns: [],
      form: { title: '', categoryId: '', levelColumns: '', checkCorn: '', needTreat: false, variables: [], triggers: [], message: '', responsibles: [] },
      varDialogShow: false,
      addvariables: { script: '', name: '', dbConnectionId: '' },
      addConditions: { ascript: '', bscript: '', operator: '' },
      variableInput: '',
      conditionDialogShow: false,
      conditionInput: '',
      curVar: null,
      curCondition: null,
      conditionUid: 0,
      varUid: 0,
      dbListColumns: [],
      assertOperatorColumns: []
    };
  },

  computed: {

  },

  watch: {},

  created() {},

  mounted() {
    this.initPullDownData();
  },

  destroyed() {},

  methods: {
    ...mapMutations([UPDATE_BOTTOM_BAR_SHOW]),
    formatVar(item) {
      console.log(this.form.variables);
      return `(${this.getDbNameByCode(item.dbConnectionId)})${item.name}=${item.script}`;
    },
    formatTriggers(item) {
      return `${item.ascript}${this.getAssertOperatorByName(item.operator)}${item.bscript}`;
    },
    getAssertOperatorByName(code) {
      const item = this.$_.find(this.assertOperatorColumns, { code: code });
      if (item) {
        return item.desc;
      } else {
        return '';
      }
    },
    getDbNameByCode(code) {
      const dbItem = this.$_.find(this.dbListColumns, { id: code });
      if (dbItem) {
        return dbItem.name;
      } else {
        return '';
      }
    },
    pickerConfirm(value) {
      this.dealValue = value.text;
    },
    handleVarEdit(item) {
      this.curVar = item;
      this.addvariables = Object.assign({}, item);
      this.varDialogShow = true;
    },
    handleConditionEdit(item) {
      this.curCondition = item;
      this.addConditions = Object.assign({}, item);
      this.conditionDialogShow = true;
    },
    handleConditionDelete(item) {
      const index = this.form.triggers.findIndex((element) => { return element.id === item.id; });
      if (index === -1) {
        return;
      } else {
        this.form.triggers.splice(index, 1);
      }
    },
    handleVarDelete(item) {
      const index = this.form.variables.findIndex((element) => { return element.id === item.id; });
      if (index === -1) {
        return;
      } else {
        this.form.variables.splice(index, 1);
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
      if (action === 'confirm') {
        if (this.checkVar(this.addvariables)) {
          if (this.curVar) {
          // 修改
            Object.assign(this.curVar, this.addvariables);
          } else {
          // 新增
            this.form.variables.push(Object.assign({}, this.addvariables, { id: 'add' + (this.varUid++) }));
          }
          this.resetAddVar();
          this.curVar = null;
          done();
          this.showBottomBar();
        } else {
          this.$toast('参数输入有误，请检查');
          done(false);
        }
      } else {
        done();
        this.resetAddVar();
        this.curVar = null;
        this.showBottomBar();
      }
    },
    resetAddVar() {
      this.addvariables = { script: '', name: '', dbConnectionId: '' };
    },
    checkVar(obj) {
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (obj[i] === null || obj[i] === undefined || obj[i] === '') {
            return false;
          }
        }
      }
      return true;
    },
    conditionBeforeClose(action, done) {
      if (action === 'confirm') {
        if (this.checkVar(this.addConditions)) {
          if (this.curCondition) {
           // 修改
            Object.assign(this.curCondition, this.addConditions);
          } else {
          // 新增
            this.form.triggers.push(Object.assign({}, this.addConditions, { id: 'add' + (this.conditionUid++) }));
          }
          this.resetAddCondition();
          this.curCondition = null;
          done();
          this.showBottomBar();
        } else {
          this.$toast('参数输入有误，请检查');
          done(false);
        }
      } else {
        done();
        this.curCondition = null;
        this.showBottomBar();
      }
    },
    resetAddCondition() {
      this.addConditions = { ascript: '', bscript: '', operator: '' };
    },
    showBottomBar() {
      const self = this;
      setTimeout(function() {
        self.UPDATE_BOTTOM_BAR_SHOW(true);
      }, 500);
    },
    addVariable() {
      this.UPDATE_BOTTOM_BAR_SHOW(false);
      this.varDialogShow = true;
    },
    addCondition() {
      this.UPDATE_BOTTOM_BAR_SHOW(false);
      this.conditionDialogShow = true;
    },
    submit() {
      api.createMonitor(this.form).then(util.filterBackendData).then(res => {
        this.$toast('创建成功');
      }).catch(err => {
        this.$toast(err);
      });
    },
    initPullDownData() {
     // 获得监控类型
      api.getMonitorCategory().then(util.filterBackendData).then(res => {
        this.categoryIdColumns = res;
      }).catch(err => { this.$toast(err); });
     // 获得等级
      api.getCodeByType('monitorLevel').then(util.filterBackendData).then(res => {
        this.levelColumns = res;
      }).catch(err => {
        this.$toast(err);
      });
      // 获得运行比较符
      api.getCodeByType('assertOperator').then(util.filterBackendData).then(res => {
        this.assertOperatorColumns = res;
      }).catch(err => {
        this.$toast(err);
      });
      this.getDbList();
    },
    getDbList() {
      api.getDbConnect().then(util.filterBackendData).then(res => {
        this.dbListColumns = res;
      }).catch(err => {
        this.$toast(err);
      });
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