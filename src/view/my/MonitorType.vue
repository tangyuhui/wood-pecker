<template>
      <common-page  title="监控分类管理">
        <template slot="content">
        <CSwipeCell v-for="(item) in list" :key="item.id" :title="item.name" editOne="编辑" editTwo="删除" @select="(option)=>onSelect(option,item)" @handleOneEvent="handleEdit(item)" @handleTwoEvent="handleDelete(item)" >
        </CSwipeCell>
        </template>
      </common-page>
</template>
<script>
import { NavBar, Icon, List, Toast, SwipeCell, Cell, CellGroup } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import CSwipeCell from '@/components/CSwiperCell';
import { dingEvent } from '@/script/util';
export default {
  name: 'monitorType',
  mixins: [],
  components: {
    CommonPage,
    CSwipeCell,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    [Toast.name]: Toast,
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  props: {

  },

  data() {
    return {
      list: [{ name: '交易', id: 1 }, { name: '核算', id: 2 }, { name: '凭证', id: 3 }, { name: '短信', id: 4 }]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    dingEvent(this.setDingNav, this);
  },

  destroyed() {},

  methods: {
    goPrev() {
      this.$router.back();
    },
    add() {
      this.$router.push({ path: '/monitorTypeAdd', query: { type: 'add' }});
    },
    handleEdit(item) {
      this.$router.push({ path: '/monitorTypeEdit', query: { type: 'edit' }});
    },
    handleDelete(item) {
      Toast('delete');
    },
    setDingNav() {
      const self = this;
      //eslint-disable-next-line
      dd.biz.navigation.setMenu({
        backgroundColor: '#eee',
        textColor: '#eee',
        items: [
          {
            'id': '1', // 字符串
            'text': '添加'
          }
        ],
        onSuccess: function(data) {
          self.add();
        }
      });
    },
    onSelect(option, item) {
      if (option.name === '编辑') {
        this.handleEdit(item);
      } else if (option.name === '删除') {
        this.handleDelete(item);
      }
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
 .database-icon{
      vertical-align: middle;
      width:32px;
      height:32px;
 }
 .van-cell-text{
     vertical-align: middle;
 }
 </style>
 