const { app, BrowserWindow } = require('electron')
// refs: https://github.com/MarshallOfSound/electron-devtools-installer
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require('electron-devtools-installer')

const path = require('path')
const url = require('url')

const isDebug = process.env.NODE_ENV === 'development';

function installDevTool() {
  const devtools = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]

  return Promise.all(devtools.map((tool => installExtension(tool))))
    .catch(err => console.log(err))
}

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({ width: 800, height: 600 })

  if (isDebug) {
    // when debug , we load http://localhost:port
    const port = process.env.PORT || 10240;
    win.loadURL(`http://localhost:${port}`);
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
  // open dev tool
  // if(isDebug){
  //   win.webContents.openDevTools()
  // }

  win.on('closed', () => {
    win = null
  })
}

function onAppReady() {
  if (isDebug) {
    // install react and redux chrome extensions tools 
    installDevTool().then((() => { createWindow() }))
  } else {
    createWindow()
  }
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', onAppReady)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

  // 在这个文件中，你可以续写应用剩下主进程代码。
  // 也可以拆分成几个文件，然后用 require 导入。