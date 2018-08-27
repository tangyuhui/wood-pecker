<template>
      <common-page  title="监控分类管理">
        <template slot="content">
         <van-swipe-cell :right-width="150" v-for="(item,index) in list" :key="index">
            <van-cell-group>
              <van-cell :title="item.name"   class="custom-van-cell">
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
import { NavBar, Icon, List, Toast, SwipeCell, Cell, CellGroup } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import { dingEvent } from '@/script/util';
export default {
  name: 'monitorType',
  mixins: [],
  components: {
    CommonPage,
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
      list: [{ name: '交易' }, { name: '核算' }, { name: '凭证' }, { name: '短信' }]
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
    handleEdit() {
      this.$router.push({ path: '/monitorTypeEdit', query: { type: 'edit' }});
    },
    handleDelete() {
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
    resetDingNav() {
      const self = this;
      //eslint-disable-next-line
      dd.biz.navigation.setMenu({
        backgroundColor: '#eee',
        textColor: '#eee',
        items: [
          {
            'id': '1', // 字符串
            'text': '返回首页'
          }
        ],
        onSuccess: function(data) {
          self.$router.push('/my');
        }
      });
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
 