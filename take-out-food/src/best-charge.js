function bestCharge(selectedItems) {
var allItems = loadAllItems();
var promotions = loadPromotions();
var itemSelect = "";
var sum = 0;
var sumAfterCutsix = 0;
var sumAfterHalfCut = 0;
var halfCutItmes = [];
var halfCutPrice = 0;
var totalSum = 0;
var itemName = [];
var itemQuantity = [];
var itemPrice = [];
var itemId = [];

var selectItemsToList = function(selectItems) {
  for (let i = 0, len = selectItems.length; i <len; i++) {
    itemId[i] = selectItems[i].slice(0, 8);
    for (let j = 0, length = allItems.length; j < length; j++) {
      if (itemId[i] === allItems[j].id) {
        itemName[i] = allItems[j].name;
        itemQuantity[i] = +selectItems[i].slice(11);
        itemPrice[i] = allItems[j].price;
      }
    }    
  }
  for (let i = 0, len = itemName.length; i < len; i++) {
    itemSelect += itemName[i] + " x " + itemQuantity[i] + " = " + itemQuantity[i] * itemPrice[i] + "元\n"
    sum += itemQuantity[i] * itemPrice[i];
  }
}

var cutSix = function() {
  if (sum >= 30) {
    return sum - 6;
  } else {
    return sum;
  }
}

var halfCut = function() {
  sumAfterHalfCut = sum;
  for (let i = 0, len = itemName.length; i < len; i++) {
    if (promotions[1].items.indexOf(itemId[i]) !== -1) {
      sumAfterHalfCut -= itemQuantity[i] * itemPrice[i] / 2;
      halfCutItmes.push(itemName[i])
    }
  }
  halfCutPrice = sum - sumAfterHalfCut;
  return sumAfterHalfCut
}

selectItemsToList(selectedItems)
sumAfterCutsix = cutSix();
sumAfterHalfCut = halfCut();

if (sumAfterCutsix <= sumAfterHalfCut && sumAfterCutsix < sum) {
  useCount = "使用优惠:\n"
             + "满30减6元，省6元\n" 
             + "-----------------------------------\n";
  totalSum = sumAfterCutsix;         
} else if (sumAfterCutsix > sumAfterHalfCut) {
  useCount = "使用优惠:\n"
             + "指定菜品半价(" + halfCutItmes.join("，") + ")，省" + halfCutPrice + "元\n" 
             + "-----------------------------------\n";
  totalSum = sumAfterHalfCut;    
} else {
  useCount = ""
  totalSum = sum; 
}
 var countInformation = `============= 订餐明细 =============\n` 
                        + itemSelect  
                        + "-----------------------------------\n"
                        + useCount + "总计：" + totalSum + "元\n"
                        + `===================================\n`; 
return countInformation;
}
