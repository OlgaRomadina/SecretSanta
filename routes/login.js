const bcrypt = require('bcrypt');

app.post('somepath', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    res.json({ isUser: false });
  };

  const isAuthenticate = await bcrypt.compare(password, user.password);

  if (isAuthenticate) {
    req.session.name = user.name;
    req.json({ 
      isCorrectPassword: true,
      name: user.name });
  };

  else {
    res.json({ isCorrectPassword: false });
  }
})
