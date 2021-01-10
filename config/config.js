const { Emitter } = require('../utils/events')
let MenuItems = [
  {
    label: '资源信息',
    click: function () {
      Emitter.emit('source')
    }
  },
  {
    label: '内存信息',
    click: function () {
      Emitter.emit('innerMemory')
    }
  },
  {
    label: '进程信息',
    click: function () {
      Emitter.emit('process')
    }
  },
  {
    label: '磁盘信息',
    click: function () {
      Emitter.emit('disk')
    }
  },
  {
    label: '系统信息',
    click: function () {
      Emitter.emit('information')
    }
  }
]

module.exports = {
  MenuItems
}