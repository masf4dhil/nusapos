const isLogin = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash("alertStatus", "Session is Out, Please login again !");
    req.flash("alertStatus", "danger");
    res.redirect('/admin/signin');
  } else {
    next();
  }
}
module.exports = isLogin;