	window.onload =function(){
		var oT=document.getElementById('t1');
		var oBtn = document.getElementById('btn');
        var oMsgbox=document.getElementById('messList');
        var oPage = document.getElementById('page');
		var URL='weibo.php';
        var hash = window.location.hash;
        //回车提交
        oT.onkeydown=function(ev){
            var oEvent =ev ||event;
            if(oEvent.keyCode == 13)
            {
                submit();
                return false;
            }
        }
		//点击发布
		oBtn.onclick=function(){
			submit();
		}
        //提交数据
        function submit()
        {
            ajax({
                url:URL,
                data:{
                    act:'add',
                    content:oT.value
                },
                success:function(str){
                    var json = eval('('+str+')');
                    if(json.error)
                    {
                        alert('添加失败！');
                    }else{
                        
                        oT.value='';
                        getAllMassage(); 
                        getAllPage();
                    }
                }
            });
        }
        //获得信息
        getAllMassage(1);
        function getAllMassage(count)
        {
            ajax({
                url:URL,
                data:{
                    act:'get',
                    page:count
                },
                success:function(str){
                    var arr = eval('('+str+')');   
                    if(arr.length<=0) return;
                    oMsgbox.innerHTML='';
                    for(var i=0;i<arr.length;i++)
                    {  
                        var json = arr[i];
                        var oDiv = createMsg(json.content,json.time,json.acc,json.ref,json.id);
                        oMsgbox.appendChild(oDiv);
                   }
                }
            });
        }
        //得到所有的页数
        getAllPage();
        function getAllPage()
        {
             ajax({
                url:URL,
                data:{
                    act:'get_page_count'
                },
                success:function(str){
                    var json = eval('('+str+')'); 
                    oPage.innerHTML='';
                    for(var i=0;i<json.count;i++)
                    {      
                        var oA = document.createElement('a');
                        oA.innerHTML = i+1;
                        oA.href='javascript:;';
                        if(!hash)
                        {
                            if(i==0)
                            {
                                oA.className ='active';
                            }
                        }
                        oA.onclick=function(){
                            getAllMassage(this.innerHTML);
                            for(var i=0;i<oPage.children.length;i++)
                            {
                                oPage.children[i].className='';
                            }
                            this.className='active';
                            window.location.hash=this.innerHTML;

                        }
                        oPage.appendChild(oA);
                    }  
                }
            });
        }
    
        function createMsg(content,time,acc,ref,id)
        {        
            var oDiv = document.createElement('div');
            oDiv.className='reply';
            var oDate = new Date();
            oDate.setTime(time*1000);
            var sDate = oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '+oDate.getHours()+':'+oDate.getMinutes()+':'+oDate.getSeconds();
            oDiv.innerHTML = '<p class="replyContent">'+content+'</p>'
            +'<p class="operation">'
                +'<span class="replyTime">'+sDate+'</span>'
                +'<span class="handle">'
                    +'<a href="javascript:;" class="top">'+acc+'</a>'
                    +'<a href="javascript:;" class="down_icon">'+ref+'</a>'
                    +'<a href="javascript:;" class="cut">删除</a>'
                +'</span>'
            +'</p>';
            var aA = oDiv.getElementsByTagName('a');
            //顶
            aA[0].onclick=function(){
                
                if(getCookie('acc'+id)){
                    alert('亲，不好意思，明天再来');
                }else{
                    var _this = this;
                    var count = parseInt(this.innerHTML);
                    ajax({
                        url:URL,
                        data:{
                            act:'acc',
                            id:id
                        },
                        success:function(str){
                            var json = eval('('+str+')');
                            if(json.error)
                            {
                                alert('顶一条失败！');
                            }
                            else{
                                count++; 
                                
                                _this.innerHTML = count;
                                //设置cookie
                                setCookie('acc'+id,'1',1); 
                            }
                        }
                    });
                }
            }
            //踩
            aA[1].onclick=function(){
                
                if(getCookie('ref'+id)){
                    alert('亲，不好意思，明天再来');
                }else{
                    var _this = this;
                    var count = parseInt(this.innerHTML);
                    ajax({
                        url:URL,
                        data:{
                            act:'ref',
                            id:id
                        },
                        success:function(str){
                            var json = eval('('+str+')');
                            if(json.error)
                            {
                                alert('踩一条失败！');
                            }
                            else{
                                count++; 
                                
                                _this.innerHTML = count; 
                                setCookie('ref'+id,'1',1); 
                            }
                        }
                    });
                }
            }
            //删除
            aA[2].onclick=function(){
                var bFlag = confirm('确认删除吗？');
                if(!bFlag) return; 
                ajax({
                url:URL,
                data:{
                    act:'del',
                    id:id
                },
                success:function(str){
                    var json = eval('('+str+')');
                    if(json.error)
                    {
                        alert('删除失败！');
                    }
                    else{
                        alert('删除成功！');
                        oMsgbox.removeChild(oDiv);
                        getAllMassage(); 
                        getAllPage();
                    }
                }
            });
            }

            return oDiv;
        }
}