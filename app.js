const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const Filestore = require('session-file-store')(session);
const path = require('path');
const lkRouter = require('./routes/lk.routes');
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

app.post("/registration", async (req, res) => {
  const findLogin = await User.findOne({
    where: {
      login: req.body.login,
    },
  });

  if (findLogin) {
    res.render("alreadyRegistered");
  } else {
    if(req.body.password1 === req.body.password2){
    const hashedPassword = await bcrypt.hash(req.body.password1, 8);
    await User.create({
      login: req.body.login,
      email: req.body.email,
      isAdmin: false,
      password: hashedPassword,
    });
  
    res.render("lk");
  } else {
      res.json({error: 'no'})
    }
  }
});

app.get("/registration", async (req, res) => {
  res.render("registration");
});

app.use('/lk', lkRouter);


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("Сервер слушает порт ", PORT);
});
