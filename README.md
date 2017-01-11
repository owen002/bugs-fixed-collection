# ie-fix
ie unsupported properties
###ie修复

>ie8、ie9给input绑定propertychange后一直触发此事件造成堆栈溢出---------------解决办法：绑定keydown mousedown方法
>ie8 input checkbox首次点击不触发change事件---------解决办法：绑定click事件，判断checkbox的值
>ie8 不支持css3 :checked选择器-------------------所有css3选择器解决办法：引入selectivzr.js 执行init方法 -----https://github.com/keithclark/selectivizr
>ie8 上传文件使用jquery.fileuploader/jquery.form.js等插件上传文件浏览器跳转至下载json文件--------解决办法：后台将接口头信息里面的返回数据类型改成text
>ie8 不支持JSON对象------解决办法：引入json2.js
>使用jquery.city.js ie8下省市联动bug：省发生变化时市出现错误的传值 ------ 解决方法：查看源码，源码使用setTimeout的方法兼容ie6，需要再省change时setTimeout去读取city的值
>ie8 在使用for in对数组进行循环时会将Array原型链上的方法也遍历出来 ------ 解决方法：修改遍历的方式使用jquery的或者最原始的遍历方法(for in 是对对象进行遍历的方法)
>使用base64编码显示的图片，IE8对于图片的base64要求小于32K，要不然加载不出来
>有些ie8 ie9默认没有console  执行console.log会报错挂起

>使用jquery跨域请求设置头信息，使用jsonp不能设置头信息，本质上请求的是js文件。要跨域设置头信息，必须在服务器后端添加：
      header('Access-Control-Allow-Origin:http://abc.cn');
      header('Access-Control-Allow-Methods:POST,GET');
      在使用正常的ajax请求方法设置头信息




##项目中的问题：

>replace方法第二个参数为函数的情况
    '{0},{1},{2}'.replace(/\{(\d+)\}/g,function(a,b,c,d){console.log(a,b,c,d)})
    {0} 0 0 {0},{1},{2}
    {1} 1 4 {0},{1},{2}
    {2} 2 8 {0},{1},{2}
    "undefined,undefined,undefined"
    '{0},{1},{2}'.replace(/\{\d+\}/g,function(a,b,c,d){console.log(a,b,c,d)})
    {0} 0 {0},{1},{2} undefined
    {1} 4 {0},{1},{2} undefined
    {2} 8 {0},{1},{2} undefined
    "undefined,undefined,undefined"


> 有父层和多个子层div的时候，在父层监听mouseover和mouseout事件的时候，当鼠标在子层间移动的时候会触发父层的mouseover mouseout事件
    产生问题的原因：
        js事件的捕获和冒泡机制：
            冒泡型事件：事件从子层一级一级向父层传递到达document
            捕获型事件：事件从document一级一级向子层传递到达点击的区域
        阻止事件的传递的方法：在W3c中，使用stopPropagation（）方法，在IE下设置cancelBubble = true；阻止事件的默认行为
        --------------http://www.jianshu.com/p/8311f782f70d
    解决办法：在mouseout的事件处理中使用setTimeout n毫秒之后执行处理过程，在mousetover中使用clearTimeout清除之前的setTimeout事件即可


> 移动端点透的问题：
    点透现象出现的原因：click事件在移动端会有300毫秒左右的延迟，在遮盖层隐藏之后点击的是遮罩层下的层。所以主要原因是click事件的延迟
    解决方法：在遮罩层下屏蔽click事件，使用touch事件。使用fastclick等库


> 事件被频繁触发的时候会产生浏览器崩溃等问题：
resize scroll mousemove等事件触发会产生频繁执行dom操作或者资源加载等行为
解决办法：使用防抖或者节流函数
    防抖：隔一定的时间后执行函数，如果函数被重复调用则重新计算改时间
        function debounce(func,time){
            var ftime;
            return function(){
                var _this = this;
                if(ftime){
                    clearTimeout(ftime);
                }
                ftime = setTimeout(function(){
                    func.apply(_this,arguments);
                },time);
            }
        }
    节流：delay周期内函数只能执行一次
        function throttle(func,delay){
            var last = 0;
            return function(){
                var current = new Date().getTime();
                if(current - last > delay){
                    func.apply(this,arguments);
                    last = current;
                }
            }
        }