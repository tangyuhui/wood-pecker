<template>
     <div>
       <div class="content">
         <router-view></router-view>
       </div>
       <div v-if="bottomBarShow">
            <van-tabbar  v-model="activeTabbar" class="tabbar">
            <van-tabbar-item  to="home"> 
              <span>首页</span>
              <i class="iconfont icon-home" slot="icon"
                   slot-scope="props"></i>
            </van-tabbar-item>
            <van-tabbar-item  to="createMonitor">  
             <span>新建</span>
             <i class="iconfont icon-new" slot="icon"  slot-scope="props" :class="{active:props.active}"></i>
             </van-tabbar-item>
            <van-tabbar-item icon="records" to="statisticAnalysis">
              <span>统计</span>
              <i class="iconfont icon-tongji" slot="icon" slot-scope="props" :class="{active:props.active}"></i>
            </van-tabbar-item>
            <van-tabbar-item  info="20" to="my">
               <span>我的</span>
              <i class="iconfont icon-person" slot="icon"  slot-scope="props" :class="{active:props.active}"></i>
            </van-tabbar-item>
        </van-tabbar>
       </div>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import { mapState } from 'vuex';
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
    ...mapState(['bottomBarShow'])
  },

  watch: {
    $route(to, from) {
      if (to !== from) {
        this.initActiveTabbar();
      }
    }
  },

  created() {
    this.initActiveTabbar();
  },

  mounted() {},

  destroyed() {},

  methods: {
    initActiveTabbar() {
      const path = this.$route.path;
      switch (path) {
        case '/frame/home':
          this.activeTabbar = 0;
          break;
        case '/frame/createMonitor':
        case '/frame/editMonitor':
          this.activeTabbar = 1;
          break;
        case '/frame/statisticAnalysis':
          this.activeTabbar = 2;
          break;
        case '/frame/my':
          this.activeTabbar = 3;
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
  position: absolute;
  top:0;
  bottom:0px;
  left:0;
  right:0;
  overflow: auto;
  padding-bottom:50px;
}
</style>
 