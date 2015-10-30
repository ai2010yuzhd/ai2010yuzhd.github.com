window.onload =function(){
	var oBox = document.getElementById('box');
	var oBtn = document.getElementById('btnClick');
	var aLi = oBox.children;
	var zIndex = 1;
	var aPos=[];
	var oNear = null;
	//布局转换
	for(var i=0;i<aLi.length;i++)
	{
		aPos.push({
			left:aLi[i].offsetLeft,
			top:aLi[i].offsetTop
		});
	}
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].style.left=aPos[i].left+'px';
		aLi[i].style.top=aPos[i].top+'px';
		aLi[i].style.position='absolute';
		aLi[i].style.margin=0;
	}
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].dataIndex=i;
		drag(aLi[i]);
	}
	oBtn.onclick=function(){
		aPos.sort(function (){
			return Math.random()-0.5;
		});
		
		for (var i=0; i<aLi.length; i++)
		{
			move(aLi[i], aPos[i] );
		}
	}
	function drag(obj)
	{
		obj.onmousedown=function(ev){
			obj.style.zIndex = zIndex++;
			var oEvent = ev || event;
			var disX = oEvent.clientX-obj.offsetLeft;
			var disY = oEvent.clientY-obj.offsetTop;
			document.onmousemove=function(ev){
				var oEvent =ev ||event;
				var l = oEvent.clientX-disX;
				var t = oEvent.clientY-disY;
				obj.style.left = l+'px';
				obj.style.top = t+'px';

				oNear = findNear(obj);
				if(oNear)
				{
					for(var i=0;i<aLi.length;i++)
					{
						aLi[i].className='';
					}
					oNear.className='active';
				}
				else
				{
					for(var i=0;i<aLi.length;i++)
					{
						aLi[i].className='';
					}
				}
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				if(oNear)
				{
					move(obj,aPos[oNear.dataIndex]);
					move(oNear,aPos[obj.dataIndex]);
					var tmp = oNear.dataIndex;
					oNear.dataIndex = obj.dataIndex;
					obj.dataIndex = tmp;

					oNear.className='';
				}
				else
				{
					move(obj,aPos[obj.dataIndex]);
				}
			}
			return false;
		}

	}
	function findNear(obj)
	{
		var nMin=999999;
		var nMinIndex=-1;
		
		for (var i=0; i<aLi.length; i++)
		{
			if (aLi[i] != obj)
			{
				if (collTest(obj, aLi[i]))
				{
					var dis=getDis(obj, aLi[i]);
					
					if (dis < nMin)
					{
						nMin=dis;
						nMinIndex=i;
					}
				}
			}
		}
		
		if (nMinIndex == -1)
		{
			return null;
		}
		else
		{
			return aLi[nMinIndex];
		}

	}
	//碰撞检测
	function collTest(obj1,obj2)
	{
		
		var l1=obj1.offsetLeft;
		var r1=l1+obj1.offsetWidth;
		var t1=obj1.offsetTop;
		var b1=t1+obj1.offsetHeight;
		
		var t2=obj2.offsetTop;
		var b2=t2+obj2.offsetHeight;
		var l2=obj2.offsetLeft;
		var r2=l2+obj2.offsetWidth;
		
		if (l2>r1 || l1>r2 || t2>b1 || t1>b2)
		{
			return false;
		}
		else
		{
			return true;
		}

	}
	//勾股定理。求最小值
	function getDis(obj1,obj2)
	{
		var a = (obj2.offsetLeft+obj2.offsetWidth/2)-(obj1.offsetLeft+obj1.offsetWidth/2);
		var b = (obj2.offsetTop+obj2.offsetHeight/2)-(obj1.offsetTop+obj1.offsetHeight/2);
		return Math.sqrt(a*a+b*b);
	}
}