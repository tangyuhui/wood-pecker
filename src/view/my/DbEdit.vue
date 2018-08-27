<template>
      <common-page  :title="pageTitle">
        <template slot="content">
          <van-cell-group>
              <van-field
                    v-model="username"
                    clearable
                    label="别称"
                    placeholder="请输入别称"
                    class="custom-van-cell"
                />
              <PopSelect cellTitle="类型" class="cell-border" :value="type" @confirm="pickerConfirm" :columns="columns"></PopSelect>
              <van-cell title="连接字符串" class="custom-style custom-van-cell" />
               <van-field
                    v-model="message"
                    type="textarea"
                    placeholder="请输入连接字符串"
                    rows="1"
                    autosize
                    clearable
                    class="custom-van-cell"
                />
          </van-cell-group>
        </template>
      </common-page>
</template>
<script>
import { Toast, Cell, CellGroup, Field, Picker, Popup } from 'vant';
import CommonPage from '@/components/common/CommonPage.vue';
import PopSelect from '@/components/PopSelect.vue';
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
    [Popup.name]: Popup
  },
  props: {
  },

  data() {
    return {
      username: '',
      pageTitle: '数据库编辑',
      showPop: false,
      message: '',
      type: '',
      columns: [{ text: 'mysql' },
        { text: 'oracle' },
        { text: 'redis' }]
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
          this.pageTitle = '数据库编辑';
          break;
        case 'add':
          this.pageTitle = '新建数据库';
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
 
 </style>
 