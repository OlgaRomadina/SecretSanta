const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    res.json({ isUser: false });
    return;
  }

  const isAuthenticate = await bcrypt.compare(password, user.password);
  if (isAuthenticate) {
    req.session.name = user.login;
    res.json({
      isCorrectPassword: true,
      name: user.login,
      isUser: true,
    });
    return;
  }

  res.json({
    isCorrectPassword: false,
    isUser: true,
  });
});

module.exports = router;
