/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })

const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("electron", {
  // 读取文件
  readFile: (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  // 写入文件
  writeFile: (filePath, content) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, "utf-8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  // 删除文件
  delFile: (filePath) => {


    return new Promise((resolve, reject) => {


      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });


    });



    
  
  },

  

  
  // 创建目录
  checkFolder: () => {
    const folderPath = "./txts";
    if (!fs.existsSync(folderPath)) {
      // 如果不存在，则创建文件夹
      fs.mkdirSync(folderPath);
    }
  },
 
  // 创建今天目录
  checkTodayFolder: (path) => {
    const folderPath = path;

    if (!fs.existsSync(folderPath)) {
      // 如果不存在，则创建文件夹
      fs.mkdirSync(folderPath);
    }
  },

  // // 验证密码
  // checkPassword: (password) => {
  //   ipcRenderer.send('password', password)
  // },
});
