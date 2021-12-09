

const checkAdmin = (req, res, next) => {
  if (req.session.user.isAdmin) {
    res.redirect('/adminLk')
  }
  return next()
}

module.exports = checkAdmin;

