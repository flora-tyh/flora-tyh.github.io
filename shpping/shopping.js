var carProducts = [
  {
    "id": 1,
    "name": "英雄牌 钢笔",
    "count": 1,
    "price": 69,
    "checked": false
  },
  {
    "id": 2,
    "name": "晨光牌 铅字笔",
    "count": 2,
    "price": 5.5,
    "checked": true
  },
  {
    "id": 3,
    "name": "晨光牌 铅笔",
    "count": 1,
    "price": 2,
    "checked": false
  },
  {
    "id": 4,
    "name": "狗熊牌 橡皮擦",
    "count": 1,
    "price": 1,
    "checked": false
  },
  {
    "id": 5,
    "name": "瑞士牌 双肩书包",
    "count": 1,
    "price": 199,
    "checked": true
  },
  {
    "id": 6,
    "name": "晨光牌 作业本",
    "count": 5,
    "price": 2.5,
    "checked": false
  }
];

var sumRow = document.getElementsByClassName("sum-row")[0];
var tbody = document.getElementsByTagName("tbody")[0];
var tr = document.getElementsByTagName("tr");
var sum = document.getElementsByClassName("sum")[0];
var countList = document.getElementsByClassName("count");
var checkBox = document.getElementsByClassName("check-box");

//计算总价函数，执行一次刷新一次总价
function totalize () {
  var totalPrice = 0;
  var countTotal = 0;
  for (var i = 0, len = tbody.rows.length; i < len - 2; i++) {
    if (checkBox[i].checked) {
      totalPrice += parseFloat(tbody.children[i+1].lastChild.innerText);
      countTotal += parseFloat(countList[i].children[1].innerText);
      }
    };
  sum.innerHTML = "共计" + countTotal + "件商品，" + totalPrice + "￥";
};

//全选函数，根据全选框的情况判定是全选还是去取消全选
function allSelect(e) {
  if (e.target.checked) {
    for (var i = 1, len = tbody.rows.length; i < len - 1; i++) {
      tbody.children[i].firstChild.firstChild.checked = true;
    }
  }
  else {
    for (var i = 1, len = tbody.rows.length; i < len - 1; i++) {
      tbody.children[i].firstChild.firstChild.checked = false;
    }
  }
}

//改变某一物品数量和总价的函数
function changeSum(e) {
  var rowIndex = e.target.parentElement.parentElement.rowIndex;
  var trCurrnt = tbody.children[rowIndex];  
  //如果点的是加号，就让数量加一
  if (e.target.className === "plus") {
    countList[rowIndex - 1].children[1].innerText++;
  };
  //如果点的是减号，就让数量减一
  if (e.target.className === "cut") {
    countList[rowIndex - 1].children[1].innerText--;
    if (rowIndex < tbody.rows.length-1 
      && countList[rowIndex - 1].children[1].innerText === "0") {
      tbody.deleteRow(rowIndex);
    }; 
  };
  //如果点的是全选，执行全选函数
  if (e.target.className === "all-select") {
    allSelect(e);
  };
  //计算每件商品的总价和所有商品的总价
  if (rowIndex < tbody.rows.length-1) {
    trCurrnt.lastChild.innerText = trCurrnt.children[2].innerText * countList[rowIndex - 1].children[1].innerText;
  };
  totalize ();
}

//添加表格
for (var i = 0; i < carProducts.length; i++) {
  var tr = document.createElement("tr");
  var checked = "";
  if (carProducts[i].checked) {
    checked = "checked"
  }
  tr.innerHTML = "<td><input type='checkbox' class='check-box'" + checked + "></td>" + 
                 "<td>" + carProducts[i].name + "</td>" +
                 "<td class='price'>" + carProducts[i].price + "</td>" +
                 "<td class='count'>" + 
                   "<button class='cut'>-</button>" +  
                   "<span>"+ carProducts[i].count +"</span>" + 
                   "<button class='plus'>+</button>" +
                 "</td>" +
                 "<td class='item-sum'> " + carProducts[i].count * carProducts[i].price + "</td>" 
  tbody.insertBefore(tr, sumRow);
}
//初始化总价
totalize ();
//给表格绑定点击事件，点击后刷新总价
tbody.addEventListener("click", changeSum);
