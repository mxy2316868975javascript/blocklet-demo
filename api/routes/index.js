const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const profileRoutes = require('./profileRoutes');

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/data', (req, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.use('/profile', profileRoutes);

module.exports = router;
