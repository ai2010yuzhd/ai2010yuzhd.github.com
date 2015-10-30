var nMaxleft = document.documentElement.clientWidth; 
var nMaxTop =  document.documentElement.clientHeight-136;

function setPos(oMain)
{
   
    var aDiv = oMain.getElementsByTagName('dl');
     
    for(var i =0;i<aDiv.length;i++)
    {
              
        var left = rnd(0,nMaxleft-parseInt(getStyle(aDiv[i],'width')))+'px'; 
       
        var top = rnd(0,nMaxTop-parseInt(getStyle(aDiv[i],'height'))) +'px';   
        aDiv[i].style.left=left;
        aDiv[i].style.top=top;
    }
}
function rnd(n,m)
{
    return Math.floor(Math.random()*(m-n)+n);
}
function getStyle(obj,sName)
{
    return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}
function drag(oDiv)
{
    oDiv.onmousedown = function(ev){
        var oEvent = ev　||　event;
        var disX = oEvent.clientX-oDiv.offsetLeft;
        var disY = oEvent.clientY-oDiv.offsetTop;
        document.onmousemove=function(ev){
            var oEvent = ev || event;
            var left = ev.clientX-disX;
            var top = ev.clientY-disY;
            if(top<0)
            {
                top=0;
            }else if(top>nMaxTop-parseInt(getStyle(oDiv,'height')))
            {
                top = nMaxTop-parseInt(getStyle(oDiv,'height'));
            }
            var a = parseInt(getStyle(oDiv,'height'));
         
            if(left<0)
            {
                left = 0;
            }
            else if(left>nMaxleft-parseInt(getStyle(oDiv,'width')))
            {
                left = nMaxleft-parseInt(getStyle(oDiv,'width'))-1;
            }
               console.log(nMaxTop+','+a);
            oDiv.style.left = left+'px';
            oDiv.style.top = top+'px';
            
        }
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup=null;
            oDiv.releaseCapture && oDiv.releaseCapture();
        }
        oDiv.setCapture && oDiv.setCapture();
        return false;
    }
}

function getTimedate(time)
{
    var oDate = new Date();
    if(time)
    { 
        oDate.setTime(time*1000);
    } 
    var sDate = oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '
    +oDate.getHours()+':'+oDate.getMinutes()+':'+oDate.getSeconds();
    return sDate;
}