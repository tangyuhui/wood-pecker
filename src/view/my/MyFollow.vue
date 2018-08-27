<template>
      <common-page  title="我关注的">
        <template slot="content">
             <van-list  v-model="enableLoading"  :finished="enableFinished"  @load="enableOnLoad">
                        <div class="item" v-for="(item,index) in list" :key="index">
                             <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title">命中数:<span class="ml-5">{{item.mz}}</span><span class="ml-10"></span>关注度:<span class="ml-5">{{item.star}}</span></p></div>
                             <div class="right-item"><van-button size="small" v-if="item.follow">取消关注</van-button><van-button size="small" v-else type="primary"> 关注</van-button></div>
                        </div>
               </van-list>
        </template>
      </common-page>
</template>
<script>
import { List, Toast, Button } from 'vant';
// 引入组件对应的样式
import 'vant/packages/vant-css/src/button.css';
import CommonPage from '@/components/common/CommonPage.vue';

export default {
  name: 'myFollow',
  mixins: [],

  components: {
    CommonPage,
    [List.name]: List,
    [Toast.name]: Toast,
    [Button.name]: Button
  },
  props: {

  },

  data() {
    return {
      tabActive: '0',
      enablelist: [],
      enableLoading: false,
      enableFinished: true,
      list: [{ title: '监控放款是否重复', follow: false, mz: '5', star: '5' }, { title: '监控放款是否多放款', follow: true, mz: '5', star: '5' }, { title: '一分钱验证出现异常', follow: true, mz: '5', star: '5' }]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    enableOnLoad() {}
  }
};
</script>

 <style scoped>
  .item{
      padding:12px 10px;
      background:#fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color:#333;
      border-bottom: 1px solid #e5e5e5;
  }
  .main-title{
      padding:2px 0 5px 0;
      font-size:16px;
  }
  .sub-title{
      font-size:14px;
  }
  .right-item{
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .icon-more{
     color:#666;
     border:#eee;
  }
 </style>

 <style>
 .van-button--small{
    min-width:65px;
}
 </style>
 