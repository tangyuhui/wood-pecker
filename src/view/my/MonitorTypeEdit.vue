<template>
      <common-page  :title="pageTitle">
        <template slot="content">
          <van-cell-group>
              <van-field
                    v-model="username"
                    clearable
                    class="custom-van-cell"
                    label="监控分类"
                    placeholder="请输入监控分类"
                />
          </van-cell-group>
          <van-button size="normal" class="submit-btn">提交</van-button>
        </template>
      </common-page>
</template>
<script>
import { Toast, Cell, CellGroup, Field, Button } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
export default {
  name: 'monitorTypeEdit',
  mixins: [],
  components: {
    CommonPage,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  props: {
  },

  data() {
    return {
      username: '',
      pageTitle: '监控分类编辑',
      showPop: false,
      message: '',
      type: ''
    };
  },

  computed: {},

  watch: {},

  created() {
    this.setPageTitle();
  },

  mounted() {},

  destroyed() {},

  methods: {
    setPageTitle() {
      const type = this.$route.query.type;
      switch (type) {
        case 'edit':
          this.pageTitle = '监控分类编辑';
          break;
        case 'add':
          this.pageTitle = '新建监控分类';
          break;
      }
    },
    showPicker() {
      this.showPop = true;
    },
    pickerConfirm(value, index) {
      this.type = value.text;
      this.showPop = false;
    },
    pickerCancel() {
      this.showPop = false;
    }
  }
};
</script>

 <style scoped>
  .submit-btn{
       width:90%;
       margin:0 auto;
       background: #3296fa;
       display: block;
       color:#fff;
       margin-top:10px;
  }
 </style>
 