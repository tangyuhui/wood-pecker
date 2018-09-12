<template>
         <div class="tips">
           <img :src="tipsImg" alt=""> 
           <p class="tips-txt">系统异常</p>
           <div>
               <button @click="goIndex" class="btn">返回首页</button>
           </div>
         </div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      tipsImg: require('@/assets/img/exception/500.png')
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    goIndex() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
  .tips{
       position:absolute;
       left:0;
       right:0;
       top:10%;
       text-align: center;
       img{
           width:80%;
           max-width:130px;
           height:auto;
       }
       .tips-txt{
           font-size:18px;
           padding:10px;
       }
  }
  .btn{
      width:80%;
      padding:10px;
      margin-top:20px;
      color:#fff;
      font-size:16px;
      background:#3296fa;
      border-radius:20px; 
  }
  
</style>
 