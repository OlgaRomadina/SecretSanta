const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const Filestore = require('session-file-store')(session);
const path = require('path');
const bcrypt = require('bcrypt');

const { User } = require('./db/models');

const PORT = process.env.PORT ?? 3000;

const app = express();

const sessionConfig = {
  store: new Filestore(),
  name: 'user_sid',
  secret: process.env.SECRET ?? 'BIG_SECRET',
  resave: false,
  saveUnitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join((__dirname, 'public'))));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(session(sessionConfig));

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
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
    req.session.name = user.name;
    req.json({
      isCorrectPassword: true,
      name: user.name,
    });
    return;
  }

  res.json({ isCorrectPassword: false });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер слушает порт ', PORT);
});
