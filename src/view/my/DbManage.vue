<template>
      <common-page  title="数据库管理">
        <template slot="content">
        <CSwipeCell v-for="(item) in list" :key="item.id" :title="item.name" editOne="编辑" editTwo="删除" @select="(option)=>onSelect(option,item)" @handleOneEvent="handleEdit(item)" @handleTwoEvent="handleDelete(item)" >
             <template slot="title">
                    <img src="./img/database.png" class="database-icon" alt="">
                    <span class="van-cell-text">{{item.name}}</span>
                </template>
        </CSwipeCell>
        <div class="drag-ball"  v-drag   @click="add">添加</div>
        </template>
      </common-page>
</template>
<script>
import { List, SwipeCell, Cell, CellGroup } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import CSwipeCell from '@/components/CSwiperCell';
import api from '@/api';
import * as util from '@/script/util';
import { mapState, mapMutations } from 'vuex';
import { UPDATE_DRAG_STATUS } from '@/store/mutation-types.js';
export default {
  name: 'dbManage',
  mixins: [],
  components: {
    CommonPage,
    CSwipeCell,
    [List.name]: List,
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

  computed: {
    ...mapState(['isDraging'])
  },

  watch: {},

  created() {},

  mounted() {
    this.getList();
    util.dingEvent(this.setDingNav, this);
  },

  destroyed() {
    util.resetNavBar();
  },

  methods: {
    ...mapMutations([UPDATE_DRAG_STATUS]),
    getList() {
      api.getDbConnect().then(util.filterBackendData).then(res => {
        this.list = res;
      }).catch(err => {
        this.$toast(err);
      });
    },
    handleEdit(item) {
      this.$router.push({ path: '/dbEdit', query: { id: item.id }});
    },
    handleDelete(item) {
      this.$dialog.confirm({
        title: '是否确认删除该数据库?'
      }).then(() => {
        return api.deleteDbConnect(item.id).then(util.filterBackendData).then(res => {
          this.$toast.success('删除成功');
        }).catch(err => {
          this.$toast(err);
        });
      }).catch((err) => {
        console.log(err);
        this.$toast('取消删除');
      });
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
    add() {
      if (this.isDraging) {
        this.UPDATE_DRAG_STATUS(false);
      } else {
        this.$router.push({ path: '/dbAdd' });
      }
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
 