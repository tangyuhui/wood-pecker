import {dingEvent,isPC} from '@/script/util'

export default {
  data () {
    return {
      // 是否已跳转
      isJump: false
    }
  },
  methods: {
    $loadingShow () {
      let self = this;
      dingEvent(function(){
        self.$dd.device.notification.showPreloader({
          text: '使劲加载中...',
          showIcon: false
        })
      })
    },
    $loadingHide () {
      let self = this;
      dingEvent(function(){
        self.$dd.device.notification.hidePreloader()
      })
    },
    $showError(text){
      let self = this;
      dingEvent(function(){
        alert(1)
        self.$dd.device.notification.toast({
          icon: 'error', //icon样式，有success和error，默认为空
          text: text //提示信息
      })
      })
    },
    $isPC(){
        return isPC()
    }
    
  } 
}
