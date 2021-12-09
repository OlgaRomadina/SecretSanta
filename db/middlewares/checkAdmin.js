

const checkAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    res.redirect('/adminLk')
  }
  return next()
}

module.exports = checkAdmin;

