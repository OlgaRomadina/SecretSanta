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

// router.delete('/', (req, res) => {
//   res.json({

//   })
// })

module.exports = router;
