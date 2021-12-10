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
    req.session.login = user.login;
    req.session.user_id = user.id;
    req.session.email = user.email;
    req.session.isAdmin = user.isAdmin;


    if (req.session.isAdmin) {
      res.json({
        isAdmin: req.session.isAdmin,
        isUser: true,
        isCorrectPassword: true,

      });
      return;
    }
    res.json({
      isCorrectPassword: true,
      // login: user.login,
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
