<template>
  <div id="app">
    <div  v-show="pageLoading">
       <ding-loading></ding-loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/iconfont/iconfont.css';
import '@/style/common.scss';
import '@/style/custom.scss';
import { resetNavBar } from '@/script/util';
import DingLoading from '@/components/DingLoading';
import { mapState } from 'vuex';
export default {
  name: '',

  mixins: [],

  components: { DingLoading },

  props: {},

  data() { return {}; },

  computed: {
    ...mapState({
      pageLoading: state => state.pageLoading
    })
  },

  watch: {},

  created() {
    resetNavBar();
  },

  mounted() {},

  destroyed() {},

  methods: { }
};
</script>
 