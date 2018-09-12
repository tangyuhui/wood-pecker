<template>
      <common-page  :title="pageTitle">
        <template slot="content">
          <van-cell-group>
              <van-field
                    v-model="form.title"
                    clearable
                    class="custom-van-cell"
                    label="监控分类"
                    placeholder="请输入监控分类"
                />
          </van-cell-group>
          <van-button size="normal" class="submit-btn" @click="submit">提交</van-button>
        </template>
      </common-page>
</template>
<script>
import { Cell, CellGroup, Field, Button } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import api from '@/api';
import * as util from '@/script/util';
export default {
  name: 'monitorTypeEdit',
  mixins: [],
  components: {
    CommonPage,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  props: {
  },

  data() {
    return {
      pageTitle: '监控分类编辑',
      showPop: false,
      type: '',
      id: null,
      form: { title: '' }
    };
  },

  computed: {},

  watch: {},

  created() {
    this.setPageType();
  },

  mounted() {
    this.getDetailById();
  },

  destroyed() {},

  methods: {
    setPageType() {
      this.id = this.$route.query.id;
      if (this.id) {
        this.pageTitle = '数据库编辑';
      } else {
        this.pageTitle = '新建数据库';
      }
    },
    getDetailById() {
      if (this.id) {
        this.$toast.loading({
          duration: 0,
          mask: true,
          message: '查询中...'
        });
        api.getMonitorCategoryById(this.id).then(util.filterBackendData).then(res => {
          this.$toast.clear();
          this.form = res;
        }).catch(err => {
          this.$toast.clear();
          this.$toast(err);
        });
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
    },
    checkForm() {
      return new Promise((resolve, reject) => {
        if (this.form.title === '') {
          reject('请输入监控分类名称');
        }
        resolve();
      });
    },
    submit() {
      /** 表单验证 */
      this.checkForm().then(res => {
        this.$toast.loading({
          duration: 0,
          mask: true,
          message: '提交中...'
        });
        /** 如果有id，修改 */
        if (this.id) {
          return api.modifyMonitorCategory(this.id, this.form).then(util.filterBackendData).then(res => {
            this.$toast.clear();
            this.$toast.success('修改成功');
            this.$router.go(-1);
          }).catch(err => {
            this.$toast.clear();
            this.$toast(err);
          });
        } else {
           /** 否则，新建 */
          return api.createMonitorCategory(this.form).then(util.filterBackendData).then(res => {
            this.$toast.clear();
            this.$toast.success('新增成功');
            this.$router.go(-1);
          }).catch(err => {
            this.$toast.clear();
            this.$toast(err);
          });
        }
      }).catch(err => {
        this.$toast(err);
      });
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
 