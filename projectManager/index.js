(function () {
  const API_ROOT = "http://localhost:3000/projects";
  let $projectTable = document.getElementById('project-table');
  let $taskingNumber = document.getElementsByClassName('tasking-number');
  let $taskingPercent = document.getElementsByClassName('tasking-percent');
  let deleteId = 0;

  function getListData() {
    var options = {
      url: API_ROOT,
      header: {},
      method: "GET",
      success: function(res) {
        initialProjectList(res); 
      },
      error: function (error) {
        console.log('error', error);
      }
    }
    ajax(options);
  }

  function deleteItemData(id) {
    var options = {
      url: API_ROOT +'/'+ id,
      header: {},
      method: "DELETE",
      success: function() {
        deleteItem(id); 
      },
      error: function (error) {
        console.log('error', error);
      }
    }
    ajax(options);
  }

  function initialProjectList(data) {
    if (Array.isArray(data) && !data instanceof Array) {
      return false;
    }
    $projectTable.innerHTML = data.reduce((acc, cur) => {
      return acc += `<tr data-id="${cur.id}">
                       <td>${cur.name}</td>
                       <td title="${cur.description}">
                         <span class="hidden-over-two-row">${cur.description}</span>
                       </td>
                       <td>${cur.endTime}</td>
                       <td class="status ${cur.status}">${cur.status}</td>
                       <td><button class="delete">删除</button></td>
                     </tr>`;
    }, '');
    projectCount(data);
  }

  function projectCount(data) {
    data.forEach(element => {
      switch(element.status) {
        case "ACTIVE":
          $taskingNumber[1].innerHTML++; 
          break;    
        case "PENDING":
          $taskingNumber[2].innerHTML++;
          break;
        case "CLOSED":
          $taskingNumber[3].innerHTML++;
          break;
        default:
          console.warn("不存在的状态")
      }
    });
    $taskingNumber[0].innerHTML = data.length;  
    Array.from($taskingPercent).forEach((element, index) => element.innerHTML
                                         = Math.round($taskingNumber[index + 1].innerHTML / $taskingNumber[0].innerHTML * 100) + "%");
  }

  function deleteMask() {
    document.getElementById("delete-mask").style.display = "block";
    document.getElementsByTagName("body")[0].className = "no-move";
  }

  function deleteItem(id) {
    document.getElementById("delete-mask").style.display = "none";
    document.getElementsByTagName("body")[0].className = "";
    var $item = $projectTable.querySelector(`tr[data-id="${id}"]`);
    $projectTable.removeChild($item);
    switch($item.children[3].innerHTML) {
      case "ACTIVE":
        $taskingNumber[1].innerHTML--; 
        break;    
      case "PENDING":
        $taskingNumber[2].innerHTML--;
        break;
      case "CLOSED":
        $taskingNumber[3].innerHTML--;
        break;
      default:
        console.warn("不存在的状态")
    }
    $taskingNumber[0].innerHTML = $projectTable.children.length;
    Array.from($taskingPercent).forEach((element, index) => element.innerHTML
                                         = Math.round($taskingNumber[index + 1].innerHTML / $taskingNumber[0].innerHTML * 100) + "%");
  } 
  
  getListData();
  document.addEventListener("click", function(e) {
    switch(e.target.className) {
      case "delete":
        let id = e.target.parentNode.parentNode.getAttribute('data-id');
        deleteMask();
        deleteId = id;
        break;
      case "back iconfont":
      case "cancel":  
        document.getElementById("delete-mask").style.display = "none";
        document.getElementsByTagName("body")[0].className = "";
        break;
      case "comfirm":
        deleteItemData(deleteId);
        break;  
      default:
        console.log(e.target.className)  
    }
  })
})()