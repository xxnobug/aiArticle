const { app, BrowserWindow, dialog, ipcMain, Tray, Menu } = require("electron");
const path = require("path");

let mainWindow = "";

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false, // 允许跨域请求
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile("index.html");
  //   mainWindow.loadFile("./login.html");
  // 打开控制台
  // mainWindow.webContents.openDevTools();
  mainWindow.setMenu(null);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

function createdDia(val) {
  dialog
    .showOpenDialog({
      title: "查看数据",
      filters: [
        { name: "Images", extensions: ["jpg", "png", "gif"] },
        { name: "Movies", extensions: ["mkv", "avi", "mp4"] },
        { name: "Custom File Type", extensions: ["as"] },
        { name: "All Files", extensions: ["*"] },
      ],
    })
    .then((res) => {
      return res;
    });
}
ipcMain.on("showDia", (event, val) => {
  event.returnValue(createdDia(val));
});

// // 监听密码验证事件
// ipcMain.on("password", (password) => {
//     console.log('密码正确');
//     mainWindow.loadFile("./index.html");

// });

function createdMenu() {
  var rightMenu = [
    {
      label: "刷新",
      click: () => {
        mainWindow.reload();
      },
    },

    {
      label: "退出",
      click: () => {
        app.quit();
      },
    },
  ];

  //   appTray = new Tray("./icon.ico");
  appTray = new Tray(path.join(__dirname, "1.png"));
  const contextMenu = Menu.buildFromTemplate(rightMenu);
  // 设置此托盘图标的悬停提示内容
  appTray.setToolTip("AI批量生成文章");

  appTray.on("click", () => {
    mainWindow.show();
  });
  // 设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
}
app
  .whenReady()
  .then(() => {
    createWindow();

    // app.on('activate', function() {
    //     // On macOS it's common to re-create a window in the app when the
    //     // dock icon is clicked and there are no other windows open.
    //     if (BrowserWindow.getAllWindows().length === 0) createWindow()
    // })
  })
  .then(() => {
    createdMenu();
  });

function showNotification(data) {
  const opation = {
    title: "帮助", //信息提示框标题
    message: "暂时还没有开发出来", //信息提示框内容
    buttons: ["好吧"], //下方显示的按钮
    noLink: true, //win下的样式
    type: "error", //图标类型
  };
  dialog.showMessageBox(opation);
}
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// try {
//   require("electron-reloader")(module, {});
// } catch (_) {}
