const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const Filestore = require('session-file-store')(session);
const path = require('path');
const lkRouter = require('./routes/lk.routes');
const regRouter = require('./routes/registration.routes');
const bcrypt = require('bcrypt');
const {User} = require('./db/models/');

const PORT = process.env.PORT ?? 3000;
const app = express();
const sessionConfig = {
  store: new Filestore(),
  name: "user_sid",
  secret: process.env.SECRET ?? "BIG_SECRET",
  resave: false,
  saveUnitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join((__dirname, "public"))));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(session(sessionConfig));





app.use('/lk', lkRouter);
app.use('/registration', regRouter);


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("Сервер слушает порт ", PORT);
});
