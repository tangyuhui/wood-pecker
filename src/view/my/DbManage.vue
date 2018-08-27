<template>
      <common-page  title="数据库管理">
        <template slot="content">
         <van-swipe-cell :right-width="150" v-for="(item,index) in list" :key="index">
            <van-cell-group>
              <van-cell :title="item.name"  class="custom-van-cell">
                <template slot="title">
                    <img src="./img/database.png" class="database-icon" alt="">
                    <span class="van-cell-text">{{item.name}}</span>
                </template>
              </van-cell>
            </van-cell-group>
             <template slot="right">
                 <div class="handle-col">
                    <span class="cell-swiper-edit" @click.stop="handleEdit">编辑</span>
                    <span class="cell-swiper-delete" @click.stop="handleDelete">删除</span>
                 </div>
             </template>
          </van-swipe-cell>
        </template>
      </common-page>
</template>
<script>
import { List, Toast, SwipeCell, Cell, CellGroup } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
export default {
  name: 'dbManage',
  mixins: [],
  components: {
    CommonPage,
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
      list: [{ name: 'Trade' }, { name: 'Cmis' }, { name: 'XiangXin' }, { name: 'Ycloans' }]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    handleEdit() {
      this.$router.push({ path: '/dbEdit', query: { type: 'edit' }});
    },
    handleDelete() {
      Toast('delete');
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
 