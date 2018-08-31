export default {
 // 当被绑定的元素插入到 DOM 中时……
 bind: function (el, binding, vnode) {
     let drag = el
     drag.addEventListener('mousedown',handleMousedown)
     drag.addEventListener('touchstart',handleTouch)
    
     function handleMousedown(e){
        var e = e || window.event; //兼容ie浏览器  
        var diffX = e.clientX - drag.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离  
        var diffY = e.clientY - drag.offsetTop;  
  
        /*低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，  
            解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，  
            可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，  
            限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中*/  
            if(typeof drag.setCapture!='undefined'){  
                drag.setCapture();  
            }  
  
        document.onmousemove = function(e) {  
            var e = e || window.event; //兼容ie浏览器  
            var left=e.clientX-diffX;  
            var top=e.clientY-diffY;  
  

  
            //移动时重新得到物体的距离，解决拖动时出现晃动的现象  
            drag.style.left = left+ 'px';  
            drag.style.top = top + 'px';  
        };  
        document.onmouseup = function(e) { //当鼠标弹起来的时候不再移动  
            this.onmousemove = null;  
            this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
  
            //修复低版本ie bug  
            if(typeof drag.releaseCapture!='undefined'){  
                drag.releaseCapture();  
            }  
        };  
     }
    function handleTouch(e){
    	    // Prevent default behavior and increase z index to bring the new element to the front
        event.preventDefault();
        console.log(e)
    	var touches = e.changedTouches[0];
    	if(!touches){
    		return false;
    	}
    	var diffX = touches.pageX - drag.offsetLeft; //手指点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离  
        var diffY =touches.pageY - drag.offsetTop;  
        console.log('diffX',diffX)
        console.log('diffY',diffY)
    	document.ontouchmove= function(e){

    		 var e = e || window.event; //兼容ie浏览器  
            var left=e.changedTouches[0].pageX-diffX;  
            var top=e.changedTouches[0].pageY-diffY;  
       
            //移动时重新得到物体的距离，解决拖动时出现晃动的现象  
            drag.style.left = left+ 'px';  
            drag.style.top = top + 'px';  
    	}
    	document.ontouchend = function(e){
    		this.ontouchmove = null;  
            this.ontouchend = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
  
            //修复低版本ie bug  
            if(typeof drag.releaseCapture!='undefined'){  
                drag.releaseCapture();  
            } 
    	}
    }
 
  }
}