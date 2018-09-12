<template>
      <common-page  title="我创建的">
        <template slot="content">
        <van-tabs v-model="tabActive" class="custom-style" swipeable>
            <mescroll ref="listScroll" id="listScroll" :up="up" :down="down" :style="{height:scrollHeight+'px'}">
               <van-tab title="启用中">
                        <div class="item" v-for="(item,index) in list" :key="index"  @click="handle">
                             <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title">命中数:<span class="ml-5">{{item.mz}}</span><span class="ml-10"></span>关注度:<span class="ml-5">{{item.star}}</span></p></div>
                             <div class="right-item"><i class="iconfont icon-more"></i></div>
                        </div>
                </van-tab>
                <van-tab title="已暂停">
                        <div class="item" v-for="(item,index) in list" :key="index"  @click="handle">
                             <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title">命中数:<span class="ml-5">{{item.mz}}</span><span class="ml-10"></span>关注度:<span class="ml-5">{{item.star}}</span></p></div>
                             <div class="right-item"><i class="iconfont icon-more"></i></div>
                        </div>
                </van-tab>
            </mescroll>
         </van-tabs>
         <van-actionsheet
            v-model="actionsheetShow"
            :actions="actions"
            @select="onSelect"
            />
        </template>
      </common-page>
</template>
<script>
import { Tab, Tabs, List, Panel, Actionsheet, Toast } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import Mescroll from '@/package/cfpaMescroll/mescroll.vue';
import { dingEvent, resetNavBar } from '@/script/util';
export default {
  name: 'myCreated',
  mixins: [],

  components: {
    CommonPage,
    Mescroll,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Panel.name]: Panel,
    [Actionsheet.name]: Actionsheet,
    [Toast.name]: Toast
  },
  props: {

  },

  data() {
    return {
      tabActive: '0',
      scrollHeight: 500,
      actionsheetShow: false,
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
      actions: [
        {
          name: '编辑'
        },
        {
          name: '暂停'
        },
        {
          name: '调试'
        },
        {
          name: '删除'
        }
      ],
      list: [{ title: '监控放款是否重复', mz: '5', star: '5' }, { title: '监控放款是否重复', mz: '5', star: '5' }, { title: '监控放款是否重复', mz: '5', star: '5' }]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
         // 计算滚动区域高度
    this.scrollHeight = this.calScrollHeight();
    dingEvent(this.setDingNav, this);
  },

  destroyed() { resetNavBar(); },

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
    onSelect(item) {
// 点击选项时默认不会关闭菜单，可以手动关闭
      this.actionsheetShow = false;
      Toast(item.name);
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
      this.$router.push('/frame/createMonitor');
    },
    handle() {
      this.actionsheetShow = true;
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
      justify-content: center;
      align-items: center;
  }
  .icon-more{
     color:#666;
     border:#eee;
   
  }
 </style>
 