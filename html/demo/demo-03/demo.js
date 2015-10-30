	window.onload =function(){
		var oBox = document.getElementById('box');
		var aImgList = document.getElementsByTagName('li');
		var oImg = document.getElementById('cImg');
		var oMimg =oImg.getElementsByTagName('img')[0];
 		var oSpan = oImg.getElementsByTagName('span')[0];
		var oBimg = document.getElementById('bImg');
		var oBgimg=document.getElementById('bagimg');
		var nMaxTop = 0;
		var nMaxLeft = 0;
		var nMaxImgT = 0;
		var nMaxImgL = 0;
		oImg.onmouseenter = function(){
			oSpan.style.display='block';
			oBimg.style.display = 'block';
			nMaxTop = oImg.offsetHeight-oSpan.offsetHeight;
			nMaxLeft = oImg.offsetWidth-oSpan.offsetWidth;
			nMaxImgT = oBgimg.offsetHeight-oBimg.offsetHeight;
			nMaxImgL = oBgimg.offsetWidth-oBimg.offsetWidth;
		}
		oImg.onmouseleave = function(){
			oSpan.style.display='none';
			oBimg.style.display = 'none';
		}

		document.onmousemove=function(ev){
			var oEvent = ev || event;
			var l = oEvent.clientX-getPos(oImg).left-oSpan.offsetWidth/2;
			var t = oEvent.clientY-getPos(oImg).top-oSpan.offsetHeight/2;
			if(l<0){
				l=0;
			}
			if(l>=nMaxLeft){
				l = nMaxLeft;
			}
			if(t<0){
				t=0;
			}
			if(t>=nMaxTop){
				t = nMaxTop;
			}
			oSpan.style.left=l +'px';
			oSpan.style.top=t +'px';

			oBgimg.style.left = -l/nMaxLeft*nMaxImgL+'px';
			oBgimg.style.top = -t/nMaxTop*nMaxImgT+'px';
		}

		for(var i=0;i<aImgList.length;i++)
		{
			(function(dataIndex){
				aImgList[i].onmouseover=function(){
					oMimg.src='images/m'+(dataIndex+1)+'.jpg';
					oBgimg.src = 'images/b'+(dataIndex+1)+'.jpg';
				}
			})(i);
		}
	}
	function getPos(obj)
	{
		var left = 0;
		var top =0;
		while(obj)
		{
			left+=obj.offsetLeft;
			top+=obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {left:left,top:top};
	}