const { getComputerMemotyInfo } = require("../../utils/index.js");
const { renderInnerMemoryInfo } = require("../../utils/render.js");
window.onload = function () {
  const memoryInfoMain = document.getElementById("memory-info-main");
  const MemotyInfo = getComputerMemotyInfo();
  let template = renderInnerMemoryInfo(MemotyInfo[0]);
  memoryInfoMain.innerHTML = template;
};