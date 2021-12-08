const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('lk');
});

router.post('/', (req, res) => {
  res.json({
    about: req.body.about,
    location: req.body.location,
  });
});

router.delete('/', (req, res) => {
  try {
    res.json({ isDeleted: 'deleted!' });
  } catch (error) {
    res.json({ isDeleted: error.message });
  }
});

module.exports = router;
