<template>
      <common-page  title="我创建的">
        <template slot="content">
        <van-tabs v-model="tabActive" class="custom-style" swipeable>
               <van-tab title="启用中">
                    <van-list  v-model="enableLoading"  :finished="enableFinished"  @load="enableOnLoad" class="mt-10">
                        <div class="item" v-for="(item,index) in list" :key="index"  @click="handle">
                             <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title"><van-icon name="clock" class="v-c"/> <span class="v-c">预警时长：2小时38分52秒</span></p></div>
                             <div class="right-item"><van-icon name="arrow" class="v-c"/> </div>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title="已暂停">
                      <van-list  v-model="enableLoading"  :finished="enableFinished"  @load="enableOnLoad" class="mt-10">
                         <div class="item" v-for="(item,index) in list" :key="index" @click="handle">
                             <div><p class="main-title">{{item.title}}</p><p class="c-999 sub-title"><van-icon name="clock" class="v-c"/> <span class="v-c">预警时长：2小时38分52秒</span></p></div>
                             <div class="right-item" ><van-icon name="arrow" class="v-c"/> </div>
                        </div>
                    </van-list>
                </van-tab>
         </van-tabs>
        </template>
      </common-page>
</template>
<script>
import { Tab, Tabs, List, Panel, Actionsheet, Toast, Icon } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
export default {
  name: 'agenda',
  mixins: [],

  components: {
    CommonPage,
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
 