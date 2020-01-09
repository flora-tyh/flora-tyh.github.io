/**
options = {
  url: "",
  method: "",
  headers: {}, 
  data: "",
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/
window.ajax = function (options) {
  //1.创建xhr对象
  options = options || {};
  options.method = options.method.toUpperCase() || "GET";
  options.data = options.data || {};
  var xhr = new XMLHttpRequest();
  //2.监听onreadystatechange事件
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status == 200 || xhr.status == 201){
          options.success(JSON.parse(xhr.responseText));
        }
        else {
          options.error(JSON.parse(xhr.responseText));
        }
    }
  }
  //3.调用open()方法 
  xhr.open(options.method, options.url, true); 
  //4.设置请求头部
  //5.调用send()方法
  switch (options.method) {
    case "POST": 
    case "PUT":
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(JSON.stringify(options.data));
      break;
    case "GET": 
    case "DELETE":  
      xhr.send(null);  
      break;
    default:
      console.log("不支持的请求方法")  
  }
}