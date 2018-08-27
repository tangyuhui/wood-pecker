<template>
    <div class="page">
      <van-nav-bar :title="title" left-text="返回" left-arrow :fixed="true" v-if="hasNavbar&&!hasCustomNavbar"  @click-left="goPrev"
  @click-right="goHome"> 
        <van-icon name="home" slot="right" />
      </van-nav-bar>
      <header v-if="hasCustomNavbar">
          <slot name="navbar">{{navbarContent}}</slot>
      </header>
       <main :class="wrapClass">
         <slot name="content">{{content}}</slot>
       </main>
  
    </div>
</template>
<script>
import { NavBar, Icon, Tabbar, TabbarItem } from 'vant';
export default {
  name: 'commonPage',

  mixins: [],

  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    navbarContent: {
      type: String,
      default: ''
    },
    hasCustomNavbar: {
      type: Boolean,
      default: false
    },
    hasNavbar: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

    };
  },

  computed: {
    wrapClass: function() {
      return {
        'wrapper-has-navbar': this.hasNavbar || this.hasCustomNavbar
      };
    }

  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    goPrev() {
      this.$router.back();
    },
    goHome() {
      this.$router.push({ path: '/my' });
    }
  }
};
</script>

 <style scoped>
 .page{
   margin-bottom:20px;
 }
 .wrapper-has-navbar{
   /*用Px或者PX代替px,防止被转成rem*/
   padding-top:46Px;
 }
  
 </style>
 <style lang="sass">
 .van-tabbar-item--active{
   color:$blue
 }
 
 </style>
 