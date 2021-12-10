const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', { isUser: req.session });
});

module.exports = router;
