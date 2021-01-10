const { net } = require('electron');
const fs = require('fs');
const { version } = require('os');
const path = require('path')
const { stringToJson } = require('./stringToJson')


/**
 * @description 获取CPU的信息的相关信息
 */

function getCpuInfo() {
  const res = fs.readFileSync('/proc/cpuinfo', { encoding: 'utf8' });
  const result = stringToJson(res);
  return result;
}


/**
 * @description 获取系统已经运行的时间
 */
function getMachineRumTime() {
  const time = fs.readFileSync('/proc/uptime', { encoding: "utf8" })
  return time;
}

/**
 * @description 获取每个进程的信息
 */
function getProcessInfo() {
  const ProcesssInfos = fs.readdirSync('/proc');
  const processes = []
  ProcesssInfos.forEach(item => {

    let finallPath = path.join('/proc', item)
    let stat = fs.lstatSync(finallPath)
    if (stat.isDirectory && !isNaN(Number(item))) {
      const processinfo = fs.readFileSync(path.join(finallPath, '/status'), { encoding: 'utf8' })
      processes.push(...stringToJson(processinfo))
    }
  })
  return processes;
}


/**
 * @description get the computer current version
 */

function getComputerVersion() {
  let version = fs.readFileSync('/proc/version', { encoding: 'utf8' });
  version = stringToJson(version);
  return version;

}


/**
 * @description get the computer current CPU info
 */


function getComputerCpuInfo() {
  let cpuinfo = fs.readFileSync('/proc/cpuinfo', { encoding: 'utf8' })
  cpuinfo = stringToJson(cpuinfo);
  return cpuinfo;
}

/**
 * @description get the disk infomation
 */

function getComputerDiskstatsInfo() {
  // /proc/partitions 
  let result = []
  let diskstatsInfo = fs.readFileSync('/proc/partitions', { encoding: 'utf8' });
  // diskstatsInfo = stringToJson(diskstatsInfo)
  return diskstatsInfo;
}


/**
 * @description get the memoryinfo
 */

function getComputerMemotyInfo() {
  let memoryinfo = fs.readFileSync('/proc/meminfo', { encoding: 'utf8' });
  memoryinfo = stringToJson(memoryinfo);
  return memoryinfo;
}


/**
 * @description get the net info
 */

function getComputerNetInfo() {
  let netInfo = fs.readFileSync('/proc/net/dev', { encoding: 'utf8' });
  netInfo = netInfo.split('\n')[2].trim().replace(/lo:/, '').split(/\s/)
  netInfo = netInfo.filter(item => item !== "")
  return {
    resiveBytes: netInfo[0],
    resivePacks: netInfo[1],
    sendBytes: netInfo[8],
    sendPacks: netInfo[9]
  }
}


/**
 * @description get the swap size
 */

function getComputerSwapInfo() {
  let SwapInfo = fs.readFileSync('/proc/swaps', { encoding: 'utf8' });
  SwapInfo = SwapInfo.split('\n')[1].split(/\s/).filter(str => str !== "")
  return {
    size: SwapInfo[2],
    used: SwapInfo[3]
  }
}

/**
 * 
 * @description  format KBToMB
 */
function getMemory(item) {
  let memory = (parseInt(item) / 1024).toFixed(2);
  return isNaN(memory) ? '0MB' : memory + "MB";
}


function kbToGB(num, dit) {
  return (num / 1024 / 1024).toFixed(dit)
}

module.exports = {
  getCpuInfo,
  getMachineRumTime,
  getProcessInfo,
  getComputerVersion,
  getComputerCpuInfo,
  getComputerDiskstatsInfo,
  getComputerMemotyInfo,
  getComputerNetInfo,
  getComputerSwapInfo,
  getMemory,
  kbToGB
}