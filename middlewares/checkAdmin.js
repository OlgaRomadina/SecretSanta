const checkAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    res.redirect('/adminLk');
  }
  return next();
};
// console.log(req.session.user);

module.exports = checkAdmin;
