
function getStyle(obj, sName)
{
	return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}
function ajax(json)
{
	json = json || {};
	if(! json.url) return;
	json.data = json.data || {};
	json.timeout = json.timeout||3000;
	json.type = json.type || 'get';
	var timer = null;
	if(window.XMLHttpRequest)
	{
		var oAjax = new XMLHttpRequest();
	}
	else
	{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}

	switch(json.type.toLowerCase())
	{
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':

			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}


	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4)
		{
			clearTimeout(timer);

			if(oAjax.status >=200 && oAjax.status<300 || oAjax.status ==304)
			{

				json.success && json.success(oAjax.responseText);
			}
			else
			{
				json.error && json.error(oAjax.status);
			}
		}
	}

	timer = setTimeout(function(){
		json.error && json.error('网络超时！！');
		oAjax.onreadystatechange = null;
		oAjax.abort();
	},json.timeout);
}
function json2url(json){
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function jsonp(josn)
{
	json = josn ||{};
	if(!json.url) return;
	json.data = json.data ||{};
	json.cbName = json.cbName || 'cb';
	var fnName = ('jsonp'+Math.random()).replace('.','');
	window[fnName]=function(result){
		json.success && json.success(result);
		oHead.removeChild(oS);
	}
	json.data[json.cbName]=fnName; 
	
	var oS = document.createElement('script');
	oS.src=json.url+'?'+json2url(json.data);
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}

function setCookie(name,value,iDay){
	if(iDay){
		var oDate=new Date();
		oDate.setDate(oDate.getDate+iDay);
		
		document.cookie=name+'='+value+';expires='+oDate;
	}else{
		document.cookie=name+'='+value;
	}
}
function getCookie(name){
	var arr=document.cookie.split('; ');
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		if(arr2[0]==name)return arr2[1];
	}
	return '';
}
function removeCookie(name){
	setCookie(name,'asdfadsf',-1000);
}

//获得随机数
function rnd(n,m){
    return parseInt(Math.random()*(m-n)+n);
}

//物体到页面的距离
function getPos(obj)
{
	var left=0;
	var top=0;
	
	while (obj)
	{
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		
		obj=obj.offsetParent;
	}
	
	return {left:left, top:top};
}
