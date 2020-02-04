(function() {
  let $itemList = document.getElementById("item-list");
  let $promostionList = document.getElementById("promotion-list")
  let $allPromotion = [];
  let $allItem = [];
  let $message = document.getElementById("message");
  let itemCount = document.getElementsByClassName("item");

  function initialItemList(data) {
    $itemList.innerHTML = data.reduce((acc, cur) => {
      return acc += `<tr class="item">
                       <td id="${cur.id}">${cur.name}</td>
                       <td>${cur.price}</td>
                       <td><input type="text" value=0 /><td>
                     <tr>`;
    }, '');
  }

  function initialPromotionList(data) {
    data.forEach(element => {
      var li = document.createElement("li")
      if (!element.items) {
        li.innerHTML = `优惠活动：${element.type}`;
      } else {
        li.innerHTML = `优惠活动：${element.type} 活动商品：`
        element.items.forEach(promotionId => {          
          $allItem.forEach(item => {            
            if (promotionId === item.id) {
              li.innerHTML = li.innerHTML + item.name + " ";
            }
          })
        })
      }
      $promostionList.appendChild(li);
    })
  }

function calculatePrice() {
  let selectedItems = [];
  Array.from(itemCount).forEach(element => {
    selectedItems.push(`${element.children[0].getAttribute("id")} x  ${element.children[2].children[0].value}`)
    console.log(element.children[2].children[0].value)
  })
  $message.innerHTML = bestCharge(selectedItems)
}

function clear() {
  Array.from(itemCount).forEach(element => {
    element.children[2].children[0].value = 0;
  })  
  $message.innerHTML = ""
}


$allItem = loadAllItems();
initialItemList($allItem);
$allPromotion = loadPromotions();
initialPromotionList($allPromotion);
document.addEventListener("click", function(e) {
  if (e.target.getAttribute("id") === "calculate") {
    calculatePrice()
  }
  if (e.target.getAttribute("id") === "clear") {
    clear()
  }
})
})()