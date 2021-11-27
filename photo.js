/*
    파일 정리 프로젝트

    파일의 확장자가 .mp4, .mov일 경우 viedo 폴더 안에 넣어줌
    .png, .aae일 경우 captured
    IMG_1234 와 IMG_E1234가 있을 경우 IMG_1234만 duplicated에 넣어줌

    실행 방법
    node photo test 할 경우 자동으로 사진 정리
*/

const fs = require('fs');
const path = require('path');
const viedo_ext = ['.mp4', '.mov'];
const captured_ext = ['.png', '.aae'];

const pictures_dir_path = path.join(
  '\\Users\\dahye\\pictures' + path.sep + process.argv[2]
);

fs.promises
  .readdir(pictures_dir_path)
  .then((pictures) => {
    pictures.forEach(function (picture) {
      let picture_ext = path.extname(picture);
      if (viedo_ext.includes(picture_ext)) {
        move_picture('viedo', picture);
      } else if (captured_ext.includes(picture_ext)) {
        move_picture('captured', picture);
      } else if (picture.indexOf('IMG_') === 0) {
        if (pictures.includes(picture.replace('_', '_E'))) {
          move_picture('duplicated', picture);
        }
      }
    });
  })
  .catch(console.error);

let move_picture = (picture_type, picture_name) => {
  let new_dir_path = path.join(pictures_dir_path + path.sep + picture_type);
  if (!fs.existsSync(new_dir_path)) {
    fs.mkdirSync(new_dir_path);
  }
  fs.promises
    .rename(
      pictures_dir_path + path.sep + picture_name,
      new_dir_path + path.sep + picture_name
    )
    .then(() => console.log('move ' + picture_name + ' to ' + picture_type))
    .catch(console.error);
};
