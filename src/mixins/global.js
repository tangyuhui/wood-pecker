import {dingEvent} from '@/script/util'

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
    
  } 
}
