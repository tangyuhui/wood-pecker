<template>
     <div>
          <van-cell  :title="cellTitle" class="custom-style custom-van-cell"   :value="cellValue" is-link  @click="showPicker"/>
           <van-popup :lazy-render="false" v-model="showPop" position="bottom">
                <van-picker show-toolbar ref="picker" :columns="columns" :value-key="valueKey"   @confirm="pickerConfirm" @cancel="pickerCancel" />
          </van-popup>
     </div>
</template>

<script>
import { Cell, Picker, Popup } from 'vant';
import { EVENT_PICKER_CONFIRM } from '@/script/const';
export default {
  name: '',

  mixins: [],

  components: {
    [Cell.name]: Cell,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  props: {
    cellTitle: {
      type: String,
      default: '',
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    valueKey: {
      type: String,
      default: 'text'
    },
    valueCode: {
      type: String,
      default: 'code'
    },
    columns: {
      type: Array,
      default: ''
    }
  },

  data() {
    return {
      showPop: false,
      cellValue: this.value,
      chooseItem: null
    };
  },

  computed: {},

  watch: {
    value(val) {
      if (!this.chooseItem || (this.chooseItem[this.valueCode] !== val)) {
        this.setDefaultValue(val);
      }
    },
    cellValue(newVal) {
      if (this.chooseItem && newVal === this.chooseItem[this.valueKey]) {
        this.$emit('input', this.chooseItem[this.valueCode]);
      }
    }
  },
  created() {
  },

  mounted() {},

  destroyed() {},

  methods: {
    showPicker() {
      this.showPop = true;
    },
    pickerConfirm(item, index) {
      this.showPop = false;
      if (Array.isArray(item)) {
        return;
      }
      this.chooseItem = item;
      this.cellValue = this.chooseItem[this.valueKey];
      this.$emit(EVENT_PICKER_CONFIRM, this.chooseItem);
    },
    pickerCancel() {
      this.showPop = false;
    },
    getPicker() {
      return this.$refs.picker;
    },
    setDefaultValue(code) {
      /** 找到了该值 */
      const item = this.getValueByItem(code);
      if (item) {
        this.$refs.picker.setValues([item[this.valueKey]]);
        this.chooseItem = item;
        this.cellValue = item[this.valueKey];
      } else {
        this.$refs.picker.setIndexes([0]);
        this.chooseItem = null;
        this.cellValue = '';
      }
    },
    getValueByItem(code) {
      if (Array.isArray(this.columns)) {
        const item = this.columns.find((item) => {
          return item[this.valueCode] === code;
        });
        if (item != null) {
          return item;
        } else {
          return '';
        }
      } else {
        return '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.log-cell{
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid rgba(31,56,88,.1);
    padding:10px 5px;
    .log-avator{
      width:50px;
      img{
          height:100%;
          width:100%;
      }
    }
    .log-progress{
        padding-left: 10px;
        flex:1;
        .deal-state{
           align-self:flex-start;
           font-size:15px;
         }
        .deal-comment{
            margin-top:5px;
            font-size:12px;
            color:#b9bbbc;
        }
    }
    .log-time{
        width:120px;
        text-align: right;
        padding-right:5px;
    }
  
}
</style>
 <style lang="scss">
 .cell-border .van-cell::after{
    left: 15px;
    right: 0;
    width: auto;
    -webkit-transform: scale(1,.5);
    transform: scale(1,.5);
    border-bottom-width: 1px;
 }

 </style>
 