<template>
      <common-page  title="数据库管理">
        <template slot="content">
        <CSwipeCell v-for="(item) in list" :key="item.id" :title="item.name" editOne="编辑" editTwo="删除" @select="(option)=>onSelect(option,item)" @handleOneEvent="handleEdit(item)" @handleTwoEvent="handleDelete(item)" >
             <template slot="title">
                    <img src="./img/database.png" class="database-icon" alt="">
                    <span class="van-cell-text">{{item.name}}</span>
                </template>
        </CSwipeCell>
        </template>
      </common-page>
</template>
<script>
import { List, Toast, SwipeCell, Cell, CellGroup } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import CSwipeCell from '@/components/CSwiperCell';
export default {
  name: 'dbManage',
  mixins: [],
  components: {
    CommonPage,
    CSwipeCell,
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
      list: [{ name: 'Trade', id: '1' }, { name: 'Cmis', id: '2' }, { name: 'XiangXin', id: '3' }, { name: 'Ycloans', id: '4' }]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    handleEdit(item) {
      this.$router.push({ path: '/dbEdit', query: { type: 'edit' }});
    },
    handleDelete(item) {
      Toast('delete');
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
 