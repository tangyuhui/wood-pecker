import store from '@/store'
import {UPDATE_DRAG_STATUS} from '@/store/mutation-types'
export default {
 // 当被绑定的元素插入到 DOM 中时……
 bind: function (el, binding, vnode) {
     let drag = el
     let isMove = false
     drag.addEventListener('mousedown',handleMousedown)
     drag.addEventListener('touchstart',handleTouch)
    console.log(vnode)
    function handleMousedown(e){
        var e = e || window.event; //兼容ie浏览器
        e.preventDefault()  
        var diffX = e.clientX - drag.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离  
        var diffY = e.clientY - drag.offsetTop;  
        /*低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，  
            解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，  
            可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，  
            限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中*/  
            if(typeof drag.setCapture!='undefined'){  
                drag.setCapture();  
            }  
           function mouseMove(e){
            var e = e || window.event; //兼容ie浏览器  
            var left=e.clientX-diffX;  
            var top=e.clientY-diffY;  
            //移动时重新得到物体的距离，解决拖动时出现晃动的现象  
            drag.style.left = left+ 'px';  
            drag.style.top = top + 'px';
            store.commit(UPDATE_DRAG_STATUS,true)
           }
           function mouseUp(e){
                document.removeEventListener('mousemove',mouseMove)
                document.removeEventListener('mouseup',mouseUp)
                  //修复低版本ie bug  
                if(typeof drag.releaseCapture!='undefined'){  
                        drag.releaseCapture();  
                }  
            } 
            document.addEventListener('mousemove',mouseMove)
            document.addEventListener('mouseup',mouseUp)
    }
    
     function handleTouch(e){
    	    // Prevent default behavior and increase z index to bring the new element to the front
    	var touches = e.changedTouches[0];
    	if(!touches){
    		return false;
    	}
    	var diffX = touches.pageX - drag.offsetLeft; //手指点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离  
        var diffY =touches.pageY - drag.offsetTop;  
        function moveFunction(e){
            var e = e || window.event; //兼容ie浏览器  
            var left=e.changedTouches[0].pageX-diffX;  
            var top=e.changedTouches[0].pageY-diffY;  
            isMove=true
            //移动时重新得到物体的距离，解决拖动时出现晃动的现象  
            drag.style.left = left+ 'px';  
            drag.style.top = top + 'px';  
        }
        function endFunction(e){
          if(isMove){
                document.removeEventListener('touchmove',moveFunction)
                document.removeEventListener('touchend',endFunction)
            }
            //重置状态
            isMove=false
            //修复低版本ie bug  
            if(typeof drag.releaseCapture!='undefined'){  
                drag.releaseCapture();  
            } 
        }
    	document.addEventListener('touchmove',moveFunction)
        document.addEventListener('touchend',endFunction)
    }
 
  }
}