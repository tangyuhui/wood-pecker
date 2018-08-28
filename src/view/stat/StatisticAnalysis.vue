<template>
       <common-page  title="统计分析">
          <template slot="content">
            <div @scroll.prevent>
              <van-tabs  v-model="tabActive" class="custom-style" swipeable @change="tabChange" :duration="0.1">
                <mescroll ref="listScroll" id="listScroll" :up="up" :down="down" :style="{height:scrollHeight+'px'}">
                      <div class="notice-bar mt-10" >当月监控巡检命中次数排行榜</div>
                      <van-tab v-for="(item,index) in tabNav" :title="item.name" :key="index" class="mt-10">
                            <div class="item" v-for="(item,index) in list" :key="index">
                                  <div class="item-child">{{index+1}}</div>     
                                  <div class="item-child">是否多放款</div>  
                                  <div  class="item-child">3小时</div>  
                            </div>
                      </van-tab>
                </mescroll>
               </van-tabs>
            </div>
          </template>
       </common-page>
</template>

<script>
import CommonPage from '@/components/common/CommonPage.vue';
import { Tab, Tabs, Toast } from 'vant';
import Mescroll from '@/package/cfpaMescroll/mescroll.vue';
export default {
  name: '',

  mixins: [],

  components: {
    Mescroll,
    CommonPage,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: Toast
  },

  props: {},

  data() {
    return {
      list: [],
      tabActive: 0,
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
      down: { },
      tabNav: [{ name: '高命中率' }, { name: '响应不及时' }, { name: '执行耗时' }]
    };
  },

  beforeRouteLeave(to, from, next) {
    this.$refs.listScroll.beforeRouteLeave();
    next();
  },

  computed: {
  },

  watch: {

  },

  created() {},

  mounted() {
       // 计算滚动区域高度
    this.scrollHeight = this.calScrollHeight();
  },

  destroyed() {},

  methods: {
    tabChange() {
    },
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
        var data = { total: 500, list: [{ title: '监控放款是否重复', follow: true, mz: '5', star: '5' }, { title: '监控放款是否重复', follow: false, mz: '5', star: '5' }, { title: '监控放款是否重复', follow: false, mz: '5', star: '5' }, { title: '监控放款是否重复', follow: false, mz: '5', star: '5' }, { title: '监控放款是否重复', follow: false, mz: '5', star: '5' }] };  // 模拟数据: ../res/pdlist1.js
        successCallback && successCallback(data);// 成功回调
      }, 500);
    },
    calScrollHeight() {
    //   const tabbarEl = document.querySelector('.van-tabbar');
    //   const tabbarElHeight = tabbarEl.getBoundingClientRect().height;
      const bodyHeight = document.body.clientHeight;
      // 44为顶部高度，50为底部高度
      const restHeight = bodyHeight - 44 - 50;
      return restHeight - 10;
    }
  }
};
</script>

<style lang="scss" scoped>
.item{
 padding:10px 15px;
 height:36px;
 display: flex;
 align-items: center;
 justify-content:space-between;
 background: #fff;
 position: relative;
 font-size:14px;
 .item-child:nth-child(1){
   border:1px solid #dcdddd;
   border-radius:50%; 
   width:25px;
   height:25px;
   flex-basis:25px;
   line-height:25px;
   text-align: center;
 }
  .item-child:nth-child(2),.item-child:nth-child(3){
    padding:0 10px;
    flex:1;
 }
  .item-child:nth-child(3){
    text-align: right;
  }
 &:not(:last-child)::after{
   border-bottom: 1px solid rgba(31,56,88,.1);
   left:0;
   right:0;
   width:auto;
   transform: scale(1,.5)
 }
  &::after {
    z-index: 1;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 0px solid rgba(31,56,88,.1);
}
}
.notice-bar{
    color: #8a6d3b;
    background-color: #fcf8e3;
    border-color: #faebcc;
    height:30px;
    line-height: 30px;
    padding:0 15px;
}
</style>
 