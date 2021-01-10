const { getComputerDiskstatsInfo } = require("../../utils/index.js");
const { renderDiskinfo } = require("../../utils/render.js");
window.onload = function () {
  let diskinfoMain = document.getElementById("diskinfo-main")
  let diskinfo = getComputerDiskstatsInfo();
  diskinfo = diskinfo.split("\n");
  let template = renderDiskinfo(diskinfo)
  diskinfoMain.innerHTML = template
};