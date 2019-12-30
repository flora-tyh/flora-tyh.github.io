var add = document.getElementById("add")
var toDoList = document.getElementById("todo-list");
var toDoDes = document.getElementsByClassName("todo-des")[0];
var list = toDoList.getElementsByTagName("li");
var storage = window.localStorage;
var done = document.getElementsByClassName("done");
var btnList = document.getElementsByClassName("btn-list")[0];
var liSpan = toDoList.getElementsByTagName("span");
var toDoListJson = [];
var index = 1;

var creatToDoItem = function(e) {
  if (e.target.id === "add" || e.keyCode === 13) {
    if (toDoDes.value) {
      var li = document.createElement("li");
      if (storage.toDoListData) {
        index = JSON.parse(storage.toDoListData).length;
      }
      li.innerHTML = "<span>" + index + ".<input type='checkbox'>" + 
                     "<p>" + toDoDes.value + "</P></span>";
      if (add.name === "complete") {
        li.firstChild.style.display = "none";
      }
      toDoList.appendChild(li);
      li.id = index;
      toDoListJson[index] = {};
      toDoListJson[index].index = index;
      toDoListJson[index].des = toDoDes.value;
      toDoListJson[index].checked = "";
      storage.setItem("toDoListData", JSON.stringify(toDoListJson));
      toDoDes.value = "";
    }
  }
}

var doneItem = function(e) {
  var spanNode = e.target.parentNode;
    if (e.target.tagName === 'INPUT') {
      if(e.target.checked) {
        spanNode.className = "checked";   
        e.target.nextSibling.className = "checked";
        toDoListJson[spanNode.parentNode.id].checked = "checked"
        storage.setItem("toDoListData", JSON.stringify(toDoListJson));
      }
      else {
        spanNode.className = "";
        e.target.nextSibling.className = "";
        toDoListJson[spanNode.parentNode.id].checked = ""
        storage.setItem("toDoListData", JSON.stringify(toDoListJson));
      }
    }
}

var selectShowItem = function(e) {
  switch (e.target.id) {
    case "all":
      showList("all");
      break;
    case "active":  
      add.name = "";
      showList("");
      break;
    case "complete":
      add.name = "complete";  
      showList("checked");
      break
    default:  
  }
}
//获取storage中的数据，初始化列表
var showList = function(btn) {
  if (storage.toDoListData) {
    toDoList.innerHTML = "";
    for (var i = 0, len = JSON.parse(storage.toDoListData).length - 1; i < len; i++) {
      var li = document.createElement("li");
      toDoListJson = JSON.parse(storage.toDoListData);
      li.innerHTML = "<span class=" + toDoListJson[i+1].checked + ">" 
                    + toDoListJson[i+1].index + ".<input type='checkbox'"
                    + toDoListJson[i+1].checked +"><p>" + toDoListJson[i+1].des 
                    + "</p></span>"
      if (btn === "all" || toDoListJson[i+1].checked === btn) {
        toDoList.appendChild(li);
        toDoListJson[i+1].checked;
      }
      li.id = toDoListJson[i+1].index;
    }
  }
}
showList("all");
document.addEventListener("click", creatToDoItem);
document.addEventListener("keydown", creatToDoItem);
toDoList.addEventListener("click", doneItem);
btnList.addEventListener("click", selectShowItem);
