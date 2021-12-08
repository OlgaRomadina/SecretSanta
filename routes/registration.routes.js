const router = require('express').Router();

router.post("/", async (req, res) => {
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
  
    res.redirect("lk");
  } else {
      res.json({error: 'no'})
    }
  }
});

router.get("/", async (req, res) => {
  res.render("registration");
});

module.exports = router;
