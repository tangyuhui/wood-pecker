<template>
      <common-page  title="监控分类管理">
        <template slot="content">
        <CSwipeCell v-for="(item) in list" :key="item.id" :title="item.title" editOne="编辑" editTwo="删除" @select="(option)=>onSelect(option,item)" @handleOneEvent="handleEdit(item)" @handleTwoEvent="handleDelete(item)" >
        </CSwipeCell>
          <div class="drag-ball" v-drag   @click.stop.prevent="add">添加</div>
          <div v-if="list.length===0" class="no-data">
            <div><img :src="noDataImg" alt=""></div>
            <h2> 暂无监控分类，赶紧添加吧！</h2>         
         </div>
        </template>
      </common-page>
</template>
<script>
import { NavBar, Icon, List, Toast, SwipeCell, Cell, CellGroup } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import CSwipeCell from '@/components/CSwiperCell';
import noDataImg from '@/assets/img/exception/empty.png';
import api from '@/api';
import * as util from '@/script/util';
import { mapState, mapMutations } from 'vuex';
import { UPDATE_DRAG_STATUS } from '@/store/mutation-types.js';

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
      list: [],
      noDataImg: noDataImg
    };
  },

  computed: {
    ...mapState(['isDraging'])
  },

  watch: {},

  created() {},

  mounted() {
    this.getMonitorCategory();
    util.dingEvent(this.setDingNav, this);
  },

  destroyed() {
    util.resetNavBar();
  },

  methods: {
    ...mapMutations([UPDATE_DRAG_STATUS]),
    goPrev() {
      this.$router.back();
    },
    add() {
      if (this.isDraging) {
        this.UPDATE_DRAG_STATUS(false);
      } else {
        this.$router.push({ path: '/monitorTypeAdd' });
      }
    },
    handleEdit(item) {
      this.$router.push({ path: '/monitorTypeEdit', query: { id: item.id }});
    },
    handleDelete(item) {
      this.$dialog.confirm({
        title: '是否确认删除该监控分类?'
      }).then(() => {
        return api.deleteMonitorCategory(item.id).then(util.filterBackendData).then(res => {
          this.$toast.success('删除成功');
          this.getMonitorCategory();
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
    getMonitorCategory() {
      api.getMonitorCategory().then(util.filterBackendData).then(res => {
        this.list = res;
      }).catch(err => {
        this.$toast(err);
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
 