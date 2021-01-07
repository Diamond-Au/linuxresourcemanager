const { Emitter } = require('../utils/events')
let MenuItems = [
  {
    label: '资源信息',
    click: function () {
      Emitter.emit('source')
      console.log("资源信息")
    }
  },
  {
    label: '内存信息',
    click: function () {
      Emitter.emit('innerMemory')
      console.log("内存信息")
    }
  },
  {
    label: '进程信息',
    click: function () {
      Emitter.emit('process')
      console.log("进程信息")
    }
  },
  {
    label: '磁盘信息',
    click: function () {
      Emitter.emit('disk')
      console.log('磁盘信息')
    }
  },
  {
    label: '系统信息',
    click: function () {
      Emitter.emit('information')
      console.log("系统信息")
    }
  }
]

module.exports = {
  MenuItems
}