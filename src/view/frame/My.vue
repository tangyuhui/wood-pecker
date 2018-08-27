<template>
      <common-page  title="我的">
        <template slot="content">
            <section class="person-msg clear">
                <div class="avatar left">
                   <!-- <img class="wx-img" alt="微信头像"  > -->
                </div>
                <div class="user-name">
                   <span>李香兰</span>
                </div>
            </section>
            <van-cell-group class="mt-10">
                <van-cell   is-link url="/agenda">
                    <i slot="icon" class="iconfont icon-todo van-cell__left-icon" />
                    <template slot="title">
                    <span class="van-cell-text">待办事项</span>
                    <van-tag type="danger">3</van-tag>
                    </template>
                </van-cell>
                <van-cell title="我创建的" is-link  url="/myCreated">
                   <i slot="icon" class="iconfont icon-create van-cell__left-icon" />
                </van-cell>
                <van-cell title="我关注的"  is-link url="/myFollow">
                   <i slot="icon" class="iconfont icon-guanzhu van-cell__left-icon" />
                </van-cell>
            </van-cell-group>
               <van-cell-group class="mt-10">
                <van-cell title="数据库管理"  is-link  url="/dbManage" >
                  <i slot="icon" class="iconfont icon-db van-cell__left-icon" />
                 </van-cell>
                <van-cell title="监控分类管理"  is-link url="/monitorType">
                   <i slot="icon" class="iconfont icon-monitor van-cell__left-icon" />
                </van-cell>
            </van-cell-group>
        </template>
      </common-page>
</template>
<script>
import { Cell, CellGroup, Icon, Tag } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
export default {
  name: 'my',
  mixins: [],

  components: {
    CommonPage,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Tag.name]: Tag
  },
  props: {

  },

  data() {
    return {};
  },
  computed: {},

  watch: {},

  created() {

  },

  mounted() {},

  destroyed() {},

  methods: {}
};
</script>

 <style scoped>
 .person-msg{
    padding:20px 10px;
    background:#fff;
    position: relative;
    vertical-align: middle;
 }
 .avatar{
    text-align:center;
    margin-right:5px;
    border-radius:50%; 
    width:50px;
    height:50px;
    overflow:hidden;
    background:#eee;
    display:flex;
    align-items:center;
    justify-content: center;
    margin-left:10px;
}
.wx-img{
    width:100%;
    height:100%;
}
.user-name{
    height:50px;
    line-height:50px;
    font-size:16PX;
    margin-left:5px;
}
 </style>
  <style>
  .van-cell {
    font-size: 17px;
 }
 </style>