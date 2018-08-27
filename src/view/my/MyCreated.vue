<template>
      <common-page  title="我创建的">
        <template slot="content">
        <van-tabs v-model="tabActive" class="custom-style" swipeable>
               <van-tab title="启用中">
                    <van-list  v-model="enableLoading"  :finished="enableFinished"  @load="enableOnLoad" class="mt-10">
                        <div class="item" v-for="(item,index) in list" :key="index"  @click="handle">
                             <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title">命中数:<span class="ml-5">{{item.mz}}</span><span class="ml-10"></span>关注度:<span class="ml-5">{{item.star}}</span></p></div>
                             <div class="right-item"><i class="iconfont icon-more"></i></div>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title="已暂停">
                      <van-list  v-model="enableLoading"  :finished="enableFinished"  @load="enableOnLoad" class="mt-10">
                        <div class="item" v-for="(item,index) in list" :key="index"  @click="handle">
                             <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title">命中数:<span class="ml-5">{{item.mz}}</span><span class="ml-10"></span>关注度:<span class="ml-5">{{item.star}}</span></p></div>
                             <div class="right-item"><i class="iconfont icon-more"></i></div>
                        </div>
                    </van-list>
                </van-tab>
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
export default {
  name: 'myCreated',
  mixins: [],

  components: {
    CommonPage,
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
      enablelist: [],
      enableLoading: false,
      enableFinished: true,
      actionsheetShow: false,
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

  mounted() {},

  destroyed() {},

  methods: {
    enableOnLoad() {

    },
    onSelect(item) {
// 点击选项时默认不会关闭菜单，可以手动关闭
      this.actionsheetShow = false;
      Toast(item.name);
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
 