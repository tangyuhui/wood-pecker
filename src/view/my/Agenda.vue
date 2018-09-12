<template>
      <common-page  title="我创建的">
        <template slot="content">
        <van-tabs v-model="tabActive" class="custom-style" swipeable>
           <mescroll ref="listScroll" id="listScroll" :up="up" :down="down" :style="{height:scrollHeight+'px'}">
                <van-tab title="启用中">
                      <div class="item" v-for="(item,index) in list" :key="index"  @click="handle">
                             <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title"><van-icon name="clock" class="v-c"/> <span class="v-c">预警时长：2小时38分52秒</span></p></div>
                             <div class="right-item"><van-icon name="arrow" class="v-c"/> </div>
                        </div>
             
                </van-tab>
                <van-tab title="已暂停">
                        <div class="item" v-for="(item,index) in list" :key="index"  @click="handle">
                             <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title"><van-icon name="clock" class="v-c"/> <span class="v-c">预警时长：2小时38分52秒</span></p></div>
                             <div class="right-item"><van-icon name="arrow" class="v-c"/> </div>
                        </div>
                </van-tab>
              </mescroll>
         </van-tabs>
        </template>
      </common-page>
</template>
<script>
import { Tab, Tabs, List, Panel, Actionsheet, Toast, Icon } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import Mescroll from '@/package/cfpaMescroll/mescroll.vue';
export default {
  name: 'agenda',
  mixins: [],

  components: {
    CommonPage,
    Mescroll,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Panel.name]: Panel,
    [Actionsheet.name]: Actionsheet,
    [Toast.name]: Toast,
    [Icon.name]: Icon
  },
  props: {

  },

  data() {
    return {
      tabActive: '0',
      enablelist: [],
      enableLoading: false,
      enableFinished: true,
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
      list: [{ title: '监控放款是否重复', mz: '5', star: '5' }, { title: '监控放款是否重复', mz: '5', star: '5' }, { title: '监控放款是否重复', mz: '5', star: '5' }]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
       // 计算滚动区域高度
    this.scrollHeight = this.calScrollHeight();
  },

  destroyed() { },

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
        var data = { total: 12, list: [{ title: '监控放款是否重复', mz: '5', star: '5' }, { title: '监控放款是否重复', mz: '5', star: '5' }, { title: '监控放款是否重复', mz: '5', star: '5' }] };  // 模拟数据: ../res/pdlist1.js
        successCallback && successCallback(data);// 成功回调
      }, 500);
    },
    calScrollHeight() {
    //   const tabbarEl = document.querySelector('.van-tabbar');
    //   const tabbarElHeight = tabbarEl.getBoundingClientRect().height;
      const bodyHeight = document.body.clientHeight;
      // 44为顶部高度，50为底部高度
      const restHeight = bodyHeight - 50;
      return restHeight - 10;
    },
    handle() {
      this.$router.push('/dealTodo');
    }
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
      justify-content: flex-end;
      align-items: center;
      font-size:18px;
      color:#999;
  }
 </style>
 