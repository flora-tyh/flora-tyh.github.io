var userName = document.getElementsByClassName("user-name")[0];
var password = document.getElementsByClassName("password")[0];
var btn = document.getElementsByClassName("button")[0];
btn.onclick = function () {
  if (userName.value === "123" && password.value === "123") {
    alert("登录成功")
  } else {
    password.value = "";
    alert("账号或密码错误")
  }
}