<template>
<div>
   <van-swipe-cell :right-width="150" @click.native="showActionsheet">
          <van-cell-group>
            <van-cell :title="title"  class="custom-van-cell van-ellipsis">
              <template slot="title">
                <slot name="title">{{title}}</slot>
              </template>
            </van-cell>
          </van-cell-group>
            <template slot="right">
                <div class="handle-col">
                  <span class="cell-swiper-edit" @click.stop="handleOneEvent">{{editOne}}</span>
                  <span class="cell-swiper-delete" @click.stop="handleTwoEvent">{{editTwo}}</span>
                </div>
            </template>
    </van-swipe-cell>
    <van-actionsheet
            v-model="actionsheetShow"
            :actions="actions"
            @select="onSelect"
            />
    <!-- <van-popup v-model="showPop" position="bottom">
              <van-picker show-toolbar :columns="columns"  @confirm="pickerConfirm" @cancel="pickerCancel" />
    </van-popup> -->
</div>
    
</template>

<script>
import { SwipeCell, Cell, CellGroup, Actionsheet } from 'vant';
import { EVENT_ACTIONSHEET_SELECT } from '@/script/const';
import { mapMutations } from 'vuex';
import { UPDATE_BOTTOM_BAR_SHOW } from '@/store/mutation-types.js';
export default {
  name: '',

  mixins: [],

  components: {
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Actionsheet.name]: Actionsheet
  },

  props: {
    editOne: {
      type: String,
      default: ''
    },
    editTwo: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      actionsheetShow: false
    };
  },

  computed: {

    actions() {
      return [{ name: this.editOne }, { name: this.editTwo }];
    }

  },

  watch: {
    actionsheetShow(newValue, oldValue) {
      this.UPDATE_BOTTOM_BAR_SHOW(oldValue);
    }
  },

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapMutations([UPDATE_BOTTOM_BAR_SHOW]),
    handleOneEvent() {
      this.$emit('handleOneEvent');
    },
    handleTwoEvent() {
      this.$emit('handleTwoEvent');
    },
    showActionsheet() {
      this.actionsheetShow = true;
    },
    onSelect(item) {
      this.actionsheetShow = false;
      this.$emit(EVENT_ACTIONSHEET_SELECT, item);
    }
  }
};
</script>

<style scoped>
 .handle-col{
     height:100%;
     width:150px;
     display:flex;
 }
 .cell-swiper-edit,.cell-swiper-delete{
     height:100%;
     width:50%;
     color:#fff;
     display:flex;
     align-items: center;
     justify-content:center;
     font-size:16px;
 }
 .cell-swiper-edit{
    background: #999;
 }
  .cell-swiper-delete{
    background: red;
 }
</style>