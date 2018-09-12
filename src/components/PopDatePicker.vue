<template>
     <div>
          <van-cell  :title="cellTitle" class="custom-style custom-van-cell"   :value="cellValue" is-link  @click="showPicker"/>
           <van-popup :lazy-render="false" v-model="showPop" position="bottom">
             <van-datetime-picker
                  v-model="chooseDate"
                  type="date"
                  @cancel="cancel"
                  @confirm="confirm"
             />
          </van-popup>
     </div>
</template>

<script>
import { Cell, Picker, Popup, DatetimePicker } from 'vant';
export default {
  name: '',

  mixins: [],

  components: {
    [Cell.name]: Cell,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker
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
    }
  },

  data() {
    return {
      showPop: false,
      cellValue: this.value,
      chooseItem: null,
      chooseDate: ''
    };
  },

  computed: {},

  watch: {
    value(val) {
      /** 如果不等于则触发赋值 */
      if (val !== this.cellValue) {
        this.cellValue = val;
      }
    },
    cellValue(newVal) {
      this.$emit('input', newVal);
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
    confirm(value) {
      this.showPop = false;
      this.cellValue = this.$moment(value).format('YYYY-MM-DD');
    },
    cancel() {
      this.showPop = false;
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
 