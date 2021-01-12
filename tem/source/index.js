const {
  getComputerNetInfo,
  getComputerSwapInfo,
  getComputerMemotyInfo,
  kbToGB,
  byteToMB,
} = require("../../utils/index.js");
const { Emitter } = require("../../utils/events.js");
const {
  getMemoryOrSawpOption,
  getReceiveOrSendOption,
} = require("../../config/config.js");
var swapDetail = document.getElementById("swap-detail");
var memoryDetail = document.getElementById("memory-detail");
var receiveDetail = document.getElementById("receive-detail");
var sendDetail = document.getElementById("send-detail");

/*
 * caculate the net speed
 */
function getNetSpeed(time) {
  let {
    receiveBytes,
    receivePacks,
    sendBytes,
    sendPacks,
  } = getComputerNetInfo();

  setInterval(() => {
    let res = getComputerNetInfo();

    Emitter.emit("10s", {
      resSpeed: parseInt((res.receiveBytes - receiveBytes) / time),
      receiveBytes: res.receiveBytes,
      sendSpeed: parseInt((res.sendBytes - sendBytes) / time),
      sendBytes: res.sendBytes,
    });
    receiveBytes = res.receiveBytes;
    receivePacks = res.receivePacks;
    sendBytes = res.sendBytes;
    sendPacks = res.sendPacks;
  }, time * 1000);
}

function setMemoryInfo(swapMyChart, memoryMyChart) {
  var swapInfo = getComputerSwapInfo();
  var memoryInfo = getComputerMemotyInfo();
  let used = parseInt(swapInfo.used);
  let all = parseInt(swapInfo.size);
  let left = all - used;
  let swapOption = getMemoryOrSawpOption({ used, left });
  let rate = ((used / all) * 100).toFixed(1) + "%";
  let swapTemplate = `
    <span>${(used / 1024).toFixed(2)}MiB (${rate})</span>
    <span>共${kbToGB(all, 2)}GiB</span>
  `;
  swapDetail.innerHTML = swapTemplate;

  all = parseInt(memoryInfo[0]["MemTotal"]);
  left = parseInt(memoryInfo[0]["MemAvailable"]);
  used = all - left;
  let memoryOption = getMemoryOrSawpOption({ used, left });
  rate = ((used / all) * 100).toFixed(1) + "%";
  let Cached = memoryInfo[0]["Cached"];
  let memoryTemplate = `
    <span>${kbToGB(used, 2)}GiB(${rate}) 共${kbToGB(all, 1)}GiB</span></br>
    <span>cache: ${kbToGB(parseInt(Cached), 1)}GiB</span>
  `;

  memoryDetail.innerHTML = memoryTemplate;
  swapMyChart.setOption(swapOption);
  memoryMyChart.setOption(memoryOption);
}

function getNetTemplate(data) {
  let template = `
    <span>正在${data.type}:${"  " + parseInt(data.speed / 1024)
    }KB/s</span></br>
    <span>一共${data.type}:${"  " + byteToMB(parseInt(data.sum), 1)
    }MiB</span>
  `;
  return template;
}

window.onload = function () {
  var swapMyChart = echarts.init(document.getElementById("swap"));
  var memoryMyChart = echarts.init(document.getElementById("memory"));
  var receiveMyChart = echarts.init(document.getElementById("receive"));
  var sendMyChart = echarts.init(document.getElementById("send"));

  setMemoryInfo(swapMyChart, memoryMyChart);
  setInterval(() => {
    setMemoryInfo(swapMyChart, memoryMyChart);
  }, 10 * 1000);

  // deal with the net echarts

  let reveiceOption = getReceiveOrSendOption();
  let sendOption = getReceiveOrSendOption();

  receiveMyChart.setOption(reveiceOption, true);
  sendMyChart.setOption(sendOption, true);
  getNetSpeed(1);
  Emitter.on("10s", (data) => {
    let receiveTem = getNetTemplate({
      type: "receive",
      speed: data.resSpeed,
      sum: data.receiveBytes,
    });
    let sendTmp = getNetTemplate({
      type: "send",
      speed: data.sendSpeed,
      sum: data.sendBytes,
    });

    receiveDetail.innerHTML = receiveTem;
    sendDetail.innerHTML = sendTmp;

    reveiceOption.series[0].data[0].value = byteToMB(data.resSpeed, 1);
    sendOption.series[0].data[0].value = byteToMB(data.sendSpeed, 1);
    receiveMyChart.setOption(reveiceOption);
    sendMyChart.setOption(sendOption);
  });

  // set the echarts
};