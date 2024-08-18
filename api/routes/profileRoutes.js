const express = require('express');
const router = express.Router();
const db = require('../database');

// 获取用户Profile信息
router.get('/', (req, res) => {
  db.get('SELECT * FROM profile', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// 更新用户Profile信息
router.post('/', (req, res) => {
  const { username, email, phone, modifiedTime } = req.body;

  db.run(
    'UPDATE profile SET username = ?, email = ?, phone = ?, modifiedTime = ?',
    [username, email, phone, modifiedTime],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ username, email, phone, modifiedTime });
      }
    },
  );
});

module.exports = router;
