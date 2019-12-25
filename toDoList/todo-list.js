var add = document.getElementById("add")
var toDoList = document.getElementById("todo-list");
var toDoDes = document.getElementsByClassName("todo-des")[0];
var list = toDoList.getElementsByTagName("li");
var storage = window.localStorage;
var done = document.getElementsByClassName("done");
var btnList = document.getElementsByClassName("btn-list")[0];
var liSpan = toDoList.getElementsByTagName("span");

var creatToDoItem = function(e) {
  if (e.target.id === "add" || e.keyCode === 13) {
    if (toDoDes.value) {
      var li = document.createElement("li");
      var index = toDoList.children.length + 1;
      li.innerHTML = "<span>" + index + ".<input type='checkbox'>" + 
                     "<p>" + toDoDes.value + "</P></span>";
      if (e.target.name === "complete") {
        li.firstChild.style.display = "none";
      }
      toDoList.appendChild(li);
      li.id = index;
      storage.setItem(li.id, "<span>" + index + ".<input type='checkbox'>" + 
                      "<p>" + toDoDes.value + "</P></span>");
      toDoDes.value = "";
    }
  }
}

var doneItem = function(e) {
  var spanNode = e.target.parentNode;
  if(e.target.checked) {
    spanNode.className = "done";   
    e.target.nextSibling.className = "done";
    storage.setItem(spanNode.parentNode.id, "<span class='done'>" + spanNode.parentNode.id + 
                    ".<input type='checkbox' checked>" + "<p class='done'>" + spanNode.children[1].innerHTML + "</p>" + "</span>");
  }
  else {
    e.target.parentNode.className = "";
    e.target.nextSibling.className = "";
    storage.setItem(spanNode.parentNode.id, "<span>" + spanNode.parentNode.id + 
                    ".<input type='checkbox'>" + "<p>" + spanNode.children[1].innerHTML + "</p>" + "</span>");
  }
}

var selectShowItem = function(e) {
  var len = liSpan.length;
  switch (e.target.id) {
    case "all":
      add.name = "";
      for (var i = 0; i < len; i++) {
          liSpan[i].style.display = "block";
      };
      break;
    case "active":  
      add.name = "";
      for (var i = 0; i < len; i++) {
        if (liSpan[i].className === "done") {
          liSpan[i].style.display = "none";
        }
        else {
          liSpan[i].style.display = "block";
        }
      }
      break;
    case "complete":
      add.name = "complete";  
      for (var i = 0; i < len; i++) {
        if (liSpan[i].className === "done") {
          liSpan[i].style.display = "block";
        }
        else {
          liSpan[i].style.display = "none";
        }
      }  
  }
}
//获取storage中的数据，初始化列表
for (var i = 0, len = storage.length; i < len; i++) {
  console.log(len);
  var li = document.createElement("li");
  var index = toDoList.children.length + 1;
  var key = i + 1;
  var val = storage[key];
  li.innerHTML = val;
  toDoList.appendChild(li);
  li.id = index;
}

document.addEventListener("click", creatToDoItem);
document.addEventListener("keydown", creatToDoItem);
toDoList.addEventListener("click", doneItem);
btnList.addEventListener("click", selectShowItem);
