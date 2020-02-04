function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let itemSelect = "";
  let sum = 0;
  let sumAfterCutsix = 0;
  let sumAfterHalfCut = 0;
  let halfCutItmes = [];
  let halfCutPrice = 0;
  let totalSum = 0;
  let selectQuantity = [];
  let selectItemPrice = [];
  let selectId = [];
  let selectName = [];
  // ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  // allItems = [{
  //   id: 'ITEM0001',
  //   name: '黄焖鸡',
  //   price: 18.00
  // }, {
  //   id: 'ITEM0013',
  //   name: '肉夹馍',
  //   price: 6.00
  // }, {
  //   id: 'ITEM0022',
  //   name: '凉皮',
  //   price: 8.00
  // }, {
  //   id: 'ITEM0030',
  //   name: '冰锋',
  //   price: 2.00
  // }];
  // promotions = [{
  //   type: '满30减6元'
  // }, {
  //   type: '指定菜品半价',
  //   items: ['ITEM0001', 'ITEM0022']
  // }];
  function selectItemsToList(data) {
    data.forEach(selectElment => {
      selectId.push(selectElment.slice(0, 8))
      allItems.forEach(item => {
        if (selectId.indexOf(item.id) === selectId.length - 1) {
          selectName.push(item.name);
          selectQuantity.push(+selectElment.slice(11));
          selectItemPrice.push(item.price);
        }
      })
    })
    selectName.forEach((element, i) => {
      itemSelect += `${element} x ${selectQuantity[i]} = ${selectQuantity[i] * selectItemPrice[i]}元\n`;
      sum += selectQuantity[i] * selectItemPrice[i];
    })
  }

  function halfCut() {
    sumAfterHalfCut = sum;
  }

  selectItemsToList(selectedItems)

  let cutSix = sum >= 30 ? sum - 6 : sum;

  
  // let halfCut = function() {
  //   sumAfterHalfCut = sum;
  //   for (let i = 0, len = itemName.length; i < len; i++) {
  //     if (promotions[1].items.indexOf(itemId[i]) !== -1) {
  //       sumAfterHalfCut -= itemQuantity[i] * itemPrice[i] / 2;
  //       halfCutItmes.push(itemName[i])
  //     }
  //   }
  //   halfCutPrice = sum - sumAfterHalfCut;
  //   return sumAfterHalfCut
  // }

  // selectItemsToList(selectedItems)
  // sumAfterCutsix = cutSix();
  // sumAfterHalfCut = halfCut();

  // if (sumAfterCutsix <= sumAfterHalfCut && sumAfterCutsix < sum) {
  //   useCount = "使用优惠:\n"
  //             + "满30减6元，省6元\n" 
  //             + "-----------------------------------\n";
  //   totalSum = sumAfterCutsix;         
  // } else if (sumAfterCutsix > sumAfterHalfCut) {
  //   useCount = "使用优惠:\n"
  //             + "指定菜品半价(" + halfCutItmes.join("，") + ")，省" + halfCutPrice + "元\n" 
  //             + "-----------------------------------\n";
  //   totalSum = sumAfterHalfCut;    
  // } else {
  //   useCount = ""
  //   totalSum = sum; 
  // }
  // let countInformation = `============= 订餐明细 =============\n` 
  //                         + itemSelect  
  //                         + "-----------------------------------\n"
  //                         + useCount + "总计：" + totalSum + "元\n"
  //                         + `===================================\n`; 
  // return countInformation;
}
