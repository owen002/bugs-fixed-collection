# ie-fix
ie unsupported properties
###ie修复

#####ie8、ie9给input绑定propertychange后一直触发此事件造成堆栈溢出---------------解决办法：绑定keydown mousedown方法
#####ie8 input checkbox首次点击不触发change事件---------解决办法：绑定click事件，判断checkbox的值
#####ie8 不支持css3 :checked选择器-------------------所有css3选择器解决办法：引入selectivzr.js 执行init方法 -----https://github.com/keithclark/selectivizr
#####ie8 上传文件使用jquery.fileuploader/jquery.form.js等插件上传文件浏览器跳转至下载json文件--------解决办法：后台将接口头信息里面的返回数据类型改成text
#####ie8 不支持JSON对象------解决办法：引入json2.js
#####使用jquery.city.js ie8下省市联动bug：省发生变化时市出现错误的传值 ------ 解决方法：查看源码，源码使用setTimeout的方法兼容ie6，需要再省change时setTimeout去读取city的值
#####ie8 在使用for in对数组进行循环时会将Array原型链上的方法也遍历出来 ------ 解决方法：修改遍历的方式使用jquery的或者最原始的遍历方法(for in 是对对象进行遍历的方法)
#####使用base64编码显示的图片，IE8对于图片的base64要求小于32K，要不然加载不出来
#####有些ie8 ie9默认没有console  执行console.log会报错挂起

#####使用jquery跨域请求设置头信息，使用jsonp不能设置头信息，本质上请求的是js文件。要跨域设置头信息，必须在服务器后端添加：
      ######header('Access-Control-Allow-Origin:http://abc.cn');
      ######header('Access-Control-Allow-Methods:POST,GET');
      ######在使用正常的ajax请求方法设置头信息



######replace方法第二个参数为函数的情况
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