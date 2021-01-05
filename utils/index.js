const fs = require('fs')
/**
 * 获取CPU的信息的相关信息
 */
function getCpuInfo() {
  var res = fs.readFileSync('/proc/cpuinfo', { encoding: 'utf8' });
  res = res.split('\n');
  console.log(res)

  let info = []
  let tmp = {}
  for (let i = 0; i < res.length; i++) {

    if (res[i] === '') {
      info.push(tmp);
      tmp = {}
    }
    else {
      let item = res[i].split(':');
      let key = item[0].trim();
      let value = item[1].trim()
      if (!isNaN(Number(value))) {
        value = Number(value);
      }
      tmp[key] = value;
    }
  }
  return info;

}
