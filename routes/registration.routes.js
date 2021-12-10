const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', async (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  const { login, email, password } = req.body;
  if (password.length < 8) {
    res.json({
      isUser: false,
      message: 'Длина пароля должна быть больше 8-ми символов',
    });
  }
  let newUser;
  const findLogin = await User.findOne({
    where: {
      login: req.body.login,
    },
  });

  if (findLogin) {
    res.json({
      isUser: false,
      message: 'Пользователь с таким логином или почтой уже существует',
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser = await User.create({
      login,
      email,
      isAdmin: false,
      password: hashedPassword,
    });

    req.session.login = newUser.login;
    req.session.user_id = newUser.id;
    req.session.email = newUser.email;
    req.session.isAdmin = newUser.isAdmin;
  }
  if (newUser) {
    res.json({ isUser: true, message: 'Регистрация прошла успешно' });
  } else {
    res.json({ isUser: false, message: 'Регистрация не прошла' });
  }
});

module.exports = router;
