const { getProcessInfo } = require("../../utils/index.js");
const { renderProcessInfo } = require("../../utils/render.js");
const processInfo = document.getElementById("process-info");
const processCount = document.querySelector(".process-count");
const btn = document.querySelector(".button");
const refreshBtn = document.querySelector(".button-refresh");
let currentPid = null;
window.onload = function () {
  const box = document.querySelector(".info-content");
  let processInfoResult = getProcessInfo();
  let template = renderProcessInfo(processInfoResult);
  processInfo.innerHTML = template;
  processCount.innerHTML = `process count: ${processInfoResult.length}`;
  /*
   * repeat excute the code to rerender the page
   */

  function sleep() {
    return new Promise((resolve) => {
      resolve();
    });
  }

  processInfo.onclick = function (e) {
    let currentcontent = e.target.parentNode;
    currentPid = currentcontent.dataset.pid;
    console.log(currentPid);
  };
  btn.onclick = function () {
    console.log(currentPid);
  };
  refreshBtn.onclick = function () {
    processInfoResult = getProcessInfo();
    template = renderProcessInfo(processInfoResult);
    processInfo.innerHTML = template;
    processCount.innerHTML = `process count: ${processInfoResult.length}`;
    console.log("refresh");
  };
};