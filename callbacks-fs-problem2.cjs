const fs = require("fs");
function read(path, cb) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log("read error");
    } else {
      cb(data);
    }
  });
}
function write(path, data, cb) {
  fs.writeFile(path, data, "utf-8", (err) => {
    if (err) {
      console.log("write error");
    } else {
      cb();
    }
  });
}
function uppend(path, data, cb) {
  fs.appendFile(path, data, (err) => {
    if (err) {
      console.log("uppend error");
    } else {
      cb();
    }
  });
}
function remove(path) {
  fs.unlink(path, (err) => {
    if (err) {
      console.log("error");
    }
  });
}
function fsproblem2() {
  read("/home/vikas/Desktop/callback-fs/lipsum.txt", function (data) {
    let upperCaseData = data.toUpperCase();
    write("./upperData.txt", upperCaseData, function () {
      write("./filenames.txt", "upperData.txt", function () {
        read("./upperData.txt", function (data2) {
          let lowerCaseData = data2.toLowerCase().replaceAll(". ", "\n");
          write("./lowerData.txt", lowerCaseData, function () {
            uppend("./filenames.txt", "\nlowerData.txt", function () {
              read("./lowerData.txt", function (data3) {
                let sortedData = data3.split(" ").sort().join(" ");
                write("./sortedData.txt", sortedData, function () {
                  uppend("./filenames.txt", "\nsortedData.txt", function () {
                    read("./filenames.txt", function (data4) {
                      let arr = data4.split("\n");
                      for (let index in arr) {
                        remove(`${arr[index]}`);
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}
module.exports = fsproblem2;
/*
   1. Read the given file lipsum.txt
   2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
   3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
   4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
   5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
