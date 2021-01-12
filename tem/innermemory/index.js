const { getComputerMemotyInfo } = require("../../utils/index.js");
const { renderInnerMemoryInfo } = require("../../utils/render.js");
var timer = null;
window.onload = function () {
  const memoryInfoMain = document.getElementById("memory-info-main");
  const MemotyInfo = getComputerMemotyInfo();
  let template = renderInnerMemoryInfo(MemotyInfo[0]);
  memoryInfoMain.innerHTML = template;

  timer = setInterval(() => {
    renderInnerMemoryInfo(MemotyInfo[0]);
    memoryInfoMain.innerHTML = template;
  }, 5 * 1000)

};

window.onunload = function () {
  clearInterval(timer);
}