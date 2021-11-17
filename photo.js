/*
    파일 정리 프로젝트

    파일의 확장자가 .mp4, .mov일 경우 viedo 폴더 안에 넣어줌
    .png, .aae일 경우 captured
    IMG_1234 와 IMG_E1234가 있을 경우 IMG_1234만 duplicated에 넣어줌

    실행 방법
    node  photo test 할 경우 자동으로 사진 정리
*/
const { dir } = require('console');
const fs = require('fs');
const path = require('path');

const video_ext = ['.mp4', '.mov'];
const captured_ext = ['.png', '.aae'];
let dirname;

function photo_setting(dirname) {
  this.dirname = path.join(__dirname + path.sep + dirname);
  console.log(this.dirname);
  fs.promises
    .readdir(this.dirname)
    .then((file_name) => {
      sort_file(file_name);
    })
    .catch(console.error);
}

const sort_file = (file_name) => {};

photo_setting('test');
