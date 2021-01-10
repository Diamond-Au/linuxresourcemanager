const {
  getComputerVersion,
  getComputerCpuInfo,
} = require("../../utils/index.js");
const { renderCpuInfo, renderOsInfo } = require("../../utils/render.js");
window.onload = function () {
  const cpuInfo = document.getElementById("cpu-info")
  const versionInfo = document.getElementById("version-info")
  let version = getComputerVersion();
  let cpuinfo = getComputerCpuInfo();
  let template = renderOsInfo(version);
  versionInfo.innerHTML = template;
  console.log(cpuinfo)
  template = renderCpuInfo(cpuinfo, cpuinfo.length);
  cpuInfo.innerHTML = template
};