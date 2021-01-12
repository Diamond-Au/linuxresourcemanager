const { getComputerDiskstatsInfo } = require("../../utils/index.js");
const { renderDiskinfo } = require("../../utils/render.js");

function setDiskInfo(diskinfoMain, diskinfo) {

  diskinfo = diskinfo.split("\n");
  let template = renderDiskinfo(diskinfo)
  diskinfoMain.innerHTML = template
}

var timer;
window.onload = function () {
  let diskinfoMain = document.getElementById("diskinfo-main")
  let diskinfo = getComputerDiskstatsInfo();
  setDiskInfo(diskinfoMain, diskinfo);
  timer = setInterval(() => {
    setDiskInfo(diskinfoMain, diskinfo);
  }, 10 * 1000);
};

window.onunload = function () {
  clearInterval(timer)
}