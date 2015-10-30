 
(function(global){
	var iSpeed = 0;
	var left = 0;
	var timer = null;
	global.startMove=function(obj,target){
		clearInterval(timer);
		timer = setInterval(function(){
			iSpeed+=(target-left)/5;
			iSpeed*=0.7;
			left+=iSpeed;
			obj.style.left =Math.round(left)+'px';
			if(Math.round(left)==target && Math.round(left)==0)
			{
				clearInterval(timer);
			}
		},30);
	}
})(window);

 