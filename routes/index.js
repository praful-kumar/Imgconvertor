var express = require('express');
var router = express.Router();
const multer = require('multer');
const webp = require('webp-converter');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    var fileNme = Date.now() + file.originalname;
    cb(null, fileNme)
  }
})

var upload = multer({ storage: storage })




/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});


/**webp to png converter */
router.post('/uploads', upload.single('image'), (req, res) => {
  var output_path = `./public/images/result/` + Date.now() + `result.png`
  console.log('path-', req.file.path);
  const result = webp.dwebp(req.file.path, output_path, "-o");
  result.then((response) => {
    console.log(response);
    res.download(output_path)
  });
})

/**-------jpg to webp converter */
router.post('/uploadswebp', upload.single('image'), (req, res) => {
  var output_path = `./public/images/webpimg/` + Date.now() + `result.webp`
  console.log('path-', req.file.path);
  const result = webp.cwebp(req.file.path, output_path, "-q 80")
  result.then((response) => {
    console.log(response);
    res.download(output_path)
  });
})



module.exports = router;
