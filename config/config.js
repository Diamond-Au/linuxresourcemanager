let MenuItems = [
  {
    label: '资源信息',
    click: function (e) {
      console.log("资源信息", e)
    }
  },
  {
    label: '内存信息',
    click: function (e) {
      console.log("内存信息", e)
    }
  },
  {
    label: '进程信息',
    click: function (e) {
      console.log("进程信息", e)
    }
  },
  {
    label: '磁盘信息',
    click: function (e) {
      console.log('磁盘信息', e)
    }
  },
  {
    label: '系统信息',
    click: function (e) {
      console.log("系统信息", e)
    }
  }
]

module.exports = {
  MenuItems
}