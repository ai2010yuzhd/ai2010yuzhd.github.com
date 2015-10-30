(function(global){
	var added=false;
	global.calendar=function (oBox)
	{
		if(!false)
		{
			added = true;
			var oLink = document.createElement('link');
			oLink.href='calendar.css';
			oLink.rel='stylesheet';
			var oHead=document.getElementsByTagName('head')[0];
			var oScript=document.getElementsByTagName('script')[0];
			oHead.insertBefore(oLink, oScript);
		}
		var oDay = document.getElementById('top');
	 	var oOl = oBox.getElementsByTagName('ol')[0];
	 	var oLeft = oBox.getElementsByTagName('a')[0];
	 	var oRight = oBox.getElementsByTagName('a')[1];
	 	var iNow =0;
	 	createCalendar();
	 	//上一个月
	 	oLeft.onclick=function(){
	 		iNow--;
	 		createCalendar();
	 	}
	 	oRight.onclick=function(){
	 		iNow++;
	 		createCalendar();
	 	}

	 	function createCalendar()
	 	{
	 		oOl.innerHTML='';	 	
	 		//头部，XX年XX月
		 	var oDate = new Date();
		 	oDate.setMonth(oDate.getMonth()+iNow);
		 	var year = oDate.getFullYear();
		 	var Month = (oDate.getMonth()+1);
		 	oDay.innerHTML =year+'年'+Month+'月'; 

		 	//获得空的
		 	var oDate = new Date();
		 	oDate.setMonth(oDate.getMonth()+iNow);
		 	oDate.setDate(1);
		 	var week = oDate.getDay();
		 	(week==0) && (week=7);
		 	for(var i=0;i<week-1;i++)
		 	{
		 		var oLi = document.createElement('li');
		 		oLi.innerHTML='';
		 		oOl.appendChild(oLi);
		 	}
		 	//日历
		 	var oDate= new Date();
		 	oDate.setMonth(oDate.getMonth()+iNow);
		 	oDate.setMonth(oDate.getMonth()+1,1);
		 	oDate.setDate(0);
		 	var total =oDate.getDate();
		 	for(var i=1;i<total;i++)
		 	{
		 		var oLi = document.createElement('li');
		 		oLi.innerHTML=i;
		 		oOl.appendChild(oLi);
		 	}
		 	var aLi =oOl.children; 
		 	//今天
		 	if(iNow==0)
		 	{ 
			 	var oDate = new Date();
			 	var oTday = oDate.getDate();
			 	for(var i=0;i<aLi.length;i++)
			 	{
			 		if(aLi[i].innerHTML==oTday)
			 		{
			 			aLi[i].className='Tay';
			 		}
			 		if(aLi[i].innerHTML<oTday)
			 		{
			 			aLi[i].className='past';
			 		}
			 	}
			}else if(iNow<0){
				for(var i =0;i<aLi.length;i++)
				{
					aLi[i].className = 'past';
				}
			}
	 	}
	}
})(window);