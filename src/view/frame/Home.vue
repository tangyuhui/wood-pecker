<template>
      <common-page  title="首页">
        <template slot="content">
            <div>
                <div class="tab eight-cents">
                   <van-tabs swipeable class="mescroll-touch-x">
                        <mescroll ref="listScroll" id="listScroll" :up="up" :down="down" :style="{height:scrollHeight+'px'}"> 
                            <van-tab v-for="(item,index) in tabNav" :title="item.name" :key="index">
                                    <div class="item" v-for="(item,index) in list" :key="index">
                                        <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title">命中数:<span class="ml-5">{{item.mz}}</span><span class="ml-10"></span>关注度:<span class="ml-5">{{item.star}}</span></p></div>
                                        <div class="right-item"><van-button size="small" v-if="item.follow" disabled>已关注</van-button><van-button size="small" v-else type="primary"> 关注</van-button></div>
                                    </div>
                            </van-tab>
                        </mescroll>  
                    </van-tabs>
                </div>
                <div class="operate van-hairline" @click="goFilter">
                    <i class="iconfont icon-filter"></i>
                     <span>筛选</span>
                </div>
                
            </div>
        </template>
      </common-page>
</template>
<script>
import { Tag, Tab, Tabs, List, Toast, Button } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import Mescroll from '@/package/cfpaMescroll/mescroll.vue';
// 引入组件对应的样式
import 'vant/packages/vant-css/src/button.css';
export default {
  name: 'home',
  mixins: [],

  components: {
    CommonPage,
    Mescroll,
    [List.name]: List,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  props: {

  },

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      scrollHeight: 500,
      up: {
        htmlNodata: '<p class="upwarp-nodata">--END--</p>',
        callback: this.upCallback, // 上拉回调
           // 以下参数可删除,不配置
        isBounce: false, // 此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
        page: { size: 5 }, // 可配置每页8条数据,默认10
        toTop: { // 配置回到顶部按钮
          src: process.env.FRONT_URL_ROOT + '/static/plugin/mescroll/img/mescroll-totop.png', // 默认滚动到1000px显示,可配置offset修改
           // html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
          offset: 100
        },
        auto: false,
        noMoreSize: 1,
        warpId: 'listScroll',
        empty: { // 配置列表无任何数据的提示
          warpId: 'listScroll',
          icon: process.env.FRONT_URL_ROOT + '/static/plugin/mescroll/img/mescroll-empty.png',
          tip: '--暂无数据--'
        }
      },
      down: {},
      tabNav: [{ name: '全部' }, { name: '交易' }, { name: '核算' }, { name: '凭证' }, { name: 'Capp' }]
    };
  },
  computed: {},

  watch: {},

  created() {
  },
  mounted() {
      // 计算滚动区域高度
    this.scrollHeight = this.calScrollHeight();
  },

  methods: {
    upCallback(page) {
      var self = this;
      var categoryId = self.type;
      this.getListDataFromNet(categoryId, page.num, page.size, function(curPageData) {
        console.log(curPageData);
      // 如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
        if (page.num === 1) self.list = [];
          // 更新列表数据
        self.list = self.list.concat(curPageData.list);
          // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          // mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
        self.$refs.listScroll.mescroll.endBySize(curPageData.list.length, curPageData.total);
       // self.mescroll.endBySize(curPageData.list.length, curPageData.total);
      }, function() {
         // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        self.mescroll.endErr();
      });
    },
    async getListDataFromNet(categoryId, pageNum, pageSize, successCallback, errorCallback) {
	// 延时一秒,模拟联网
      setTimeout(function() {
        var data = { total: 12, list: [{ title: '监控放款是否重复', follow: true, mz: '5', star: '5' }, { title: '监控放款是否重复', follow: false, mz: '5', star: '5' }, { title: '监控放款是否重复', follow: false, mz: '5', star: '5' }, { title: '监控放款是否重复', follow: false, mz: '5', star: '5' }, { title: '监控放款是否重复', follow: false, mz: '5', star: '5' }] };  // 模拟数据: ../res/pdlist1.js
        successCallback && successCallback(data);// 成功回调
      }, 500);
    },
    calScrollHeight() {
    //   const tabbarEl = document.querySelector('.van-tabbar');
    //   const tabbarElHeight = tabbarEl.getBoundingClientRect().height;
      const bodyHeight = document.body.clientHeight;
      // 44为顶部高度，50为底部高度
      const restHeight = bodyHeight - 50 - 44;
      return restHeight - 10;
    },
    goFilter() {
      this.$router.push('/FilterType');
    }
  }
};
</script>

 <style scoped>
 .person-msg{
    padding:20px 10px;
    background:#fff;
    position: relative;
    vertical-align: middle;
 }
 .avatar{
    text-align:center;
    margin-right:5px;
    border-radius:50%; 
    width:50px;
    height:50px;
    overflow:hidden;
    background:#eee;
    display:flex;
    align-items:center;
    justify-content: center;
    margin-left:10px;
}
.wx-img{
    width:100%;
    height:100%;
}
.user-name{
    height:50px;
    line-height:50px;
    font-size:16PX;
    margin-left:5px;
}
.tab{
    /* width:80%; */
}
.operate{
    position:fixed;
    right:0;
    top:0;
    width:20%;
    height:44px;
    padding-right:5px;
    line-height:44px;
    background:#fff;
    font-size:14px;
    color:#333;
    text-align: right;
}
.operate::after{
    border-width:1px 0;
}
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

 </style>
<style lang="scss">
  .van-cell {
    font-size: 17px;
 }
 .van-tab--active{
     color:$blue;
 }
 .van-tabs__line{
     background: $blue;
 }
 .van-tabs__content{
     min-height:500px;
 }
 .eight-cents .van-tabs--line .van-tabs__wrap{
     width:80%;
     position:fixed;
     top:0;
      right:20%;
      height:44px;
 }
 
 </style>