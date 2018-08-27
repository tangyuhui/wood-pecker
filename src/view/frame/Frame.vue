<template>
     <div>
       <div class="content">
         <router-view></router-view>
       </div>
        <van-tabbar  v-model="activeTabbar">
            <van-tabbar-item  to="home"> 
              <span>首页</span>
              <i class="iconfont icon-home" slot="icon"
                   slot-scope="props"></i>
            </van-tabbar-item>
            <van-tabbar-item>  
             <span>新建</span>
             <i class="iconfont icon-new" slot="icon"  slot-scope="props" :class="{active:props.active}"></i>
             </van-tabbar-item>
            <van-tabbar-item icon="records">
              <span>统计</span>
              <i class="iconfont icon-tongji" slot="icon" slot-scope="props" :class="{active:props.active}"></i>
            </van-tabbar-item>
             <van-tabbar-item  info="20" to="my">
               <span>我的</span>
              <i class="iconfont icon-person" slot="icon"  slot-scope="props" :class="{active:props.active}"></i>
              </van-tabbar-item>
        </van-tabbar>
     </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  name: '',

  mixins: [],

  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  props: {},

  data() {
    return {
      activeTabbar: 0
    };
  },

  computed: {

  },

  watch: {},

  created() {
    this.initActiveTabbar();
  },

  mounted() {},

  destroyed() {},

  methods: {
    initActiveTabbar() {
      const path = this.$route.path;
      switch (path) {
        case '/frame/my':
          this.activeTabbar = 3;
          break;
        case '/frame/home':
          this.activeTabbar = 0;
          break;
        default :
          this.activeTabbar = 0;
          break;
      }
    }
  }
};
</script>

<style scoped>
.content {
  padding-bottom: 60px;
}
</style>
 