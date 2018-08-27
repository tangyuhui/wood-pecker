<template>
     <div>
          <article class="log-cell">
                    <div class="log-avator">
                        <img :src="imgSrc" alt="头像" srcset="">
                    </div>
                    <div class="log-progress">
                        <div class="deal-state">{{state}}</div>
                        <div class="deal-comment">{{comment}}</div>
                    </div>
                    <div class="log-time">{{date}}</div>
            </article> 
     </div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {
    imgSrc: {
      type: String,
      default: require('./img/avator.png')
    },
    state: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {}
};
</script>

<style lang="scss" scoped>
.log-cell{
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid rgba(31,56,88,.1);
    padding:10px 5px;
    .log-avator{
      width:50px;
      img{
          height:100%;
          width:100%;
      }
    }
    .log-progress{
        padding-left: 10px;
        flex:1;
        .deal-state{
           align-self:flex-start;
           font-size:15px;
         }
        .deal-comment{
            margin-top:5px;
            font-size:12px;
            color:#b9bbbc;
        }
    }
    .log-time{
        width:120px;
        text-align: right;
        padding-right:5px;
    }
  
}
</style>
 