(function () {
  const API_ROOT = "http://localhost:3000/projects";
  let $projectName = document.getElementById('project-name');
  let $projectDes = document.getElementById('project-des');
  let $endTime = document.getElementById('end-time');
  let $projectStatus = document.getElementById('project-status');
  let $projectDelete = document.getElementById('project-delete');

  // TODO： get user list，when success, run renderUserList
  function getListData() {
    var options = {
      url: API_ROOT,
      header: {},
      method: "GET",
      success: function(res) {
        renderProjectList(res); 
      },
      error: function (error) {
          console.log('error', error);
      }
    }
    ajax(options);
  }

  function renderProjectList(data) {
    console.log(data);
  }
})()