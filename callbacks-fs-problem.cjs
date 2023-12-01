const fs = require("fs");
let copyofDir = "";
let path = "";
function createDir(dir, fileLimit, cb) {
  fs.mkdir(dir, (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("directory is created");
      cb();
    }
  });
}
function createFile(dir, start, fileLimit, cb) {
  path = `${dir}/file.JSON${start}`;
  if (start <= fileLimit) {
    fs.writeFile(path, "utf-8", (err) => {
      if (err) {
        console.log("error");
      } else {
        console.log(`File is created${start}`);
        cb();
      }
    });
  }
}
function deleteFile(dir, fileNumber, cb) {
  fs.unlink(dir, (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("file is deleted" + fileNumber);
      cb();
    }
  });
}

function recursiveCreationFiles(dir, start, fileLimit) {
  createFile(dir, start, fileLimit, function () {
    deleteFile(path, start, function () {
      recursiveCreationFiles(dir, start + 1, fileLimit);
    });
  });
}
function fsCallBack(dir, fileLimit) {
  copyofDir = dir;
  createDir(dir, fileLimit, function () {
    recursiveCreationFiles(dir, 1, fileLimit);
  });
}
module.exports = fsCallBack;
//fsCallBack("./newDir", 14);
