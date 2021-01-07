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
 * @default get the computer current CPU info
 */


 function getComputerCpuInfo() {
   let cpuinfo = fs.readFileSync('/proc/cpuinfo', {encoding:'utf8'})
   cpuinfo = stringToJson(cpuinfo);
   return cpuinfo;
 }


module.exports = {
  getCpuInfo,
  getMachineRumTime,
  getProcessInfo,
  getComputerVersion,
  getComputerCpuInfo
}