const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/profile.json');

// 获取用户Profile信息
router.get('/', (req, res) => {
  fs.readFile(DATA_PATH, (err, data) => {
    if (err) {
      res.status(500).json({ error: '查询失败' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// 更新用户Profile信息
router.post('/', (req, res) => {
  fs.writeFile(DATA_PATH, JSON.stringify(req.body), (err) => {
    if (err) {
      res.status(500).json({ error: '更新失败' });
      return;
    }
    res.json({ message: '更新成功' });
  });
});

module.exports = router;
