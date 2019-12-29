;
(function () {
  var $formInput = document.querySelector('.form-input');
  var $formButton = document.querySelector('.form-button');
  var $formTips = document.querySelector('.form-tips');
  var $weatherTitle = document.querySelector('.weather-title');
  var $weather = document.querySelector('.weather');

  $formButton.addEventListener('click', function () {
    var value = $formInput.value;
    if (validCity(value)) {
      requestWeather(value);
    } else {
      $formTips.style.display = 'block';
    }
  });
  $formInput.addEventListener('focus', function () {
    $formTips.style.display = 'none';
  });

  function validCity(city) {
    return /^([a-zA-Z0-9\u4e00-\u9fa5\·]{2,10})$/.test(city);
  }

  function resultSuccess(res) {
    var realtime = res.result.realtime;
    var future = res.result.future;

    var nodeStr = `<li>
                      <h6 class="weather-date">实时</h6>
                      <p class="weather-temp">${realtime.temperature}℃</p>
                      <p class="weather-info">${realtime.info}</p>
                      <p class="weather-direct">${realtime.direct}</p>
                    </li>`;
    for (var i = 0, len = future.length; i < len; i++) {
      var weather = future[i];
      nodeStr += `<li>
                    <h6 class="weather-date">${weather.date}</h6>
                    <p class="weather-temp">${weather.temperature}</p>
                    <p class="weather-info">${weather.weather}</p>
                    <p class="weather-direct">${weather.direct}</p>
                  </li>`;
    }
    $weatherTitle.innerHTML = res.result.city;
    $weather.innerHTML = nodeStr;
  }

  function requestWeather(city) {
    ajax({
      type: 'get',
      url: 'http://localhost:7777',
      data: {
        city: city,
        key: '9f772a897685aaf813155e91c8c88d9b'
      },
      success: resultSuccess,
      error: function (error) {
        console.log('error', error);
      }
    });
  }
  
  // please code here ···
  function ajax (options) {
    //1.创建xhr对象
    options = options || {};
    options.data = options.data || {};
    var method = options.type;
    var xhr = new XMLHttpRequest();
    //2.监听onreadystatechange事件
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 ||
              xhr.status === 304){
            options.success(JSON.parse(xhr.responseText));
          }
          else {
            options.error(JSON.parse(xhr.responseText));
          }
      }
    }
    //3.调用open()方法  
    //4.设置请求头部
    //5.调用send()方法
    if (method === "post") {
      xhr.open(method, options.url, true);
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhr.send(data);
    }
    else {
      xhr.open(method, options.url + '/?city=' + options.data.city + '&key=' + options.data.key, true);
      xhr.send(null);
    }
  }
})();