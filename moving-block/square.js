var box = document.getElementsByClassName("box")[0];
var moveBox = document.getElementsByClassName("move-box")[0];
var fixedBox = document.getElementsByClassName("fixed-box")[0];

moveBox.onmousedown = function (e) {
  var mouseX = e.clientX - box.offsetLeft - moveBox.offsetLeft;
  var mouseY = e.clientY - box.offsetTop - moveBox.offsetTop;
  document.onmousemove = function (event) {
    var moveX = event.clientX - box.offsetLeft - mouseX;
    var moveY = event.clientY - box.offsetTop - mouseY;
    if (moveX <= (box.offsetWidth - moveBox.offsetWidth) 
        && moveX > 0) {
      moveBox.style.left = moveX + "px";
    }
    else if (moveX <= 0) {
      moveBox.style.left = 0 + "px";
    }
    else {
      moveBox.style.left = box.offsetWidth - moveBox.offsetWidth + "px";
    };
    if (moveY <= (box.offsetHeight - moveBox.offsetHeight) 
        && moveY > 0) {
      moveBox.style.top = moveY + "px";
    }
    else if (moveY <= 0) {
      moveBox.style.top = 0 + "px";
    }
    else {
      moveBox.style.top = box.offsetHeight - moveBox.offsetHeight + "px";
    };;
    if ((moveX >= (fixedBox.offsetLeft - moveBox.offsetWidth))
        && (moveX <= (fixedBox.offsetLeft + fixedBox.offsetWidth))
        && (moveY >= (fixedBox.offsetTop - moveBox.offsetHeight))
        && (moveY <= (fixedBox.offsetTop + fixedBox.offsetHeight))) {
      fixedBox.style.backgroundColor = "blue";
    }
  }
}

document.onmouseup = function () {
  document.onmousemove = null;
}