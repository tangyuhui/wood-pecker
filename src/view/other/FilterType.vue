<template>
      <common-page  title="首页">
        <template slot="content">
              <section class="sys-filter">
                    <h4 class="title">按系统筛选</h4>
                    <div class="system-exhibit">
                        <div class="child" v-for="(item,index) in tabNav" :key="index"> 
                            <div class="child-content">{{item.name}}</div>
                       </div>
                    </div>
                </section>
                 <footer>
                    <div class="button-group">
                        <button @click="cancel">取消</button>
                        <button class="primary"  @click="confirm">确认</button>
                     </div>
                 </footer>
          </template>
      </common-page>
</template>

<script>
import CommonPage from '@/components/common/CommonPage.vue';
import { Button } from 'vant';
export default {
  name: 'FilterType',

  mixins: [],

  components: {
    CommonPage,
    [Button.name]: Button },

  props: {},

  data() {
    return {
      tabNav: [{ name: '全部' }, { name: '交易' }, { name: '核算' }, { name: '凭证' }, { name: 'Capp' }]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    cancel() {
      this.$router.go(-1);
    },
    confirm() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.sys-filter{
    background: #fff;
    .title{
     font-size:15px;
     padding:5px;
     color:#999;
    }
    .system-exhibit{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between ;
    .child{
        flex-basis: 50%;
        padding:5px 10px;
        .child-content{
            padding:10px;
            background: #F6F6F6;
            border-radius: 5px;
            text-align: center;
            color:#444;
        }
    }
}
}

footer{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    background:#fff;
    padding:10px;
    .button-group{
        display: flex;
        justify-content: space-between;
        button{
            width:48%;
            background:#fff;
            border:1px solid #eee;
            padding:8px;
            border-radius: 5px;
            color:#000;
            &.primary{
                background:#38ADFF;
                color:#fff;
                border:1px solid #38ADFF;
            }
        }
    }
}
</style>
 