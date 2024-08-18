const router = require('express').Router();
const profileRoutes = require('./profileRoutes');
const avatarUploadRoutes = require('./uploadRoutes');
// const express = require('express');
// const path = require('path');


router.use('/profile', profileRoutes);
router.use('/avatar', avatarUploadRoutes);

// 存在uploads文件夹下
// router.use('/avatar', express.static(path.join(__dirname, 'public', 'uploads')));
// router.use('/uploads', express.static(path.join(__dirname, '/uploads')));

module.exports = router;
