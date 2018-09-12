<template>
      <common-page  :title="pageTitle">
        <template slot="content">
          <van-cell-group>
              <van-field
                    v-model="form.name"
                    clearable
                    label="名称"
                    placeholder="请输入名称"
                    class="custom-van-cell"
                />
              <PopSelect cellTitle="类型" class="cell-border" ref="pickerSelect" v-model="form.providerType" :columns="columns" value-key="desc"></PopSelect>
              <!-- <van-cell title="连接字符串" class="custom-style custom-van-cell" /> -->
               <van-field
                    v-model="form.url"
                    type="textarea"
                      label="连接字符串"
                    placeholder="请输入连接字符串"
                    rows="1"
                    autosize
                    clearable
                    class="custom-van-cell"
                />
               <van-field
                    v-model="form.username"
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"
                    class="custom-van-cell"
             />
               <van-field
                    v-model="form.password"
                    clearable
                    label="密码"
                    type="password"
                    placeholder="请输入密码"
                    class="custom-van-cell"
                />
          </van-cell-group>
          <div class="btn-container">
             <van-button size="large"   type="primary" class="mt-10 submit-btn" @click="submit">提交</van-button>
          </div>
        </template>
      </common-page>
</template>
<script>
import { Toast, Cell, CellGroup, Field, Picker, Popup, Button } from 'vant';
// 引入组件对应的样式
import 'vant/packages/vant-css/src/button.css';
import CommonPage from '@/components/common/CommonPage.vue';
import PopSelect from '@/components/PopSelect.vue';
import api from '@/api';
import * as util from '@/script/util';
export default {
  name: 'dbManage',
  mixins: [],
  components: {
    CommonPage,
    PopSelect,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Button.name]: Button
  },
  props: {
  },

  data() {
    return {
      id: null,
      username: '',
      pageTitle: '数据库编辑',
      showPop: false,
      message: '',
      type: '',
      columns: [],
      picker: null,
      pickerSelect: null,
      form: { providerType: '', name: '', url: '', username: '', password: '' }
    };
  },

  computed: {

  },

  watch: {
  },

  created() {
    this.setPageType();
  },

  mounted() {
    this.getDbType().then(() => {
      if (this.id) {
        this.getPageParams();
      }
    });
  },

  destroyed() {},

  methods: {
    getPageParams() {
      const query = this.$route.query;
      // this.pickerSelect = this.$refs.pickerSelect;
      if (query) {
        api.getDbById(this.id).then(util.filterBackendData).then(res => {
          this.form = res;
        }).catch(err => {
          Toast(err);
        });
      }
    },
    setPageType() {
      this.id = this.$route.query.id;
      if (this.id) {
        this.pageTitle = '数据库编辑';
      } else {
        this.pageTitle = '新建数据库';
      }
    },
    getDbType() {
      return api.getCodeByType('DbType').then(util.filterBackendData).then(res => {
        this.columns = res;
      }).catch(err => {
        Toast(err);
      });
    },
    checkForm() {
      return new Promise((resolve, reject) => {
        if (this.form.name === '') {
          reject('请输入名称');
        }
        if (this.form.providerType === '') {
          reject('请选择数据库类型');
        }
        if (this.form.url === '') {
          reject('请输入连接字符串');
        }
        if (this.form.username === '') {
          reject('请输入用户名');
        }
        if (this.form.password === '') {
          reject('请输入密码');
        }
        resolve();
      });
    },
    submit() {
      this.checkForm().then(res => {
        Toast.loading({
          duration: 0,
          mask: true,
          message: '提交中...'
        });
        if (this.id) {
          return api.modifyDbConnect(this.id, this.form).then(util.filterBackendData).then(res => {
            Toast.clear();
            Toast.success('修改成功');
            this.$router.push('/dbManage');
          });
        } else {
          return api.createDbConnect(this.form).then(util.filterBackendData).then(res => {
            Toast.clear();
            Toast.success('添加成功');
            this.$router.push('/dbManage');
          });
        }
      }).catch(err => {
        Toast(err);
      });
    }
  }
};
</script>

 <style scoped>
 .btn-container{
   padding:8px;
 }
 .submit-btn{
   margin-top:20px;
 }
 </style>
 