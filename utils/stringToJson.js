/**
 * @author orange
 * @description 将字符串转化为JSON对象
 */
function stringToJson(data) {
  data = data.split('\n');
  let info = []
  let tmp = {}
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '') {
      info.push(tmp);
      tmp = {}
    }
    else {
      let item = data[i].split(':');
      let key = item[0].trim();
      let value = item[1].trim()
      if (!isNaN(Number(value))) {
        value = Number(value);
      }
      tmp[key] = value;
    }
  }
  info = info.filter(item => Object.keys(item).length !== 0);
  return info;
}

module.exports = {
  stringToJson
}