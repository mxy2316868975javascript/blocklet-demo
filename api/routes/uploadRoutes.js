const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database');
const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'avatars');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 检查上传目录是否存在，如果不存在则创建它
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
    // cb(null, 'public/uploads'); // 存储路径
    // const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'avatars');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // 保留原始文件扩展名
  },
});

const upload = multer({ storage: storage });

// todo: 更新头像
// router.post('/', upload.single('avatar'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: '无文件导入' });
//   }

//   const avatarUrl = `/uploads/${req.file.filename}`;
//   db.run('UPDATE profile SET avatar = ?', [avatarUrl], (err) => {
//     if (err) {
//       console.error(err.message);
//       return res.status(500).json({ error: '上传失败' });
//     }
//     res.json({ avatar: avatarUrl });
//   });
// });


module.exports = router;
