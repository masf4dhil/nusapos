const users = require('../models/users');
const bycrypt = require("bcryptjs");

module.exports = {
  // viewSignIn: async (req, res) => {
  //   try {
  //     const alertMessage = req.flash("alertMessage");
  //     const alertStatus = req.flash("alertStatus");
  //     const alert = { message: alertMessage, status: alertStatus };
  //       res.render("index", { alert, title: "Staycation | Login" });
  //   } catch (error) {
  //     res.redirect("/admin/signin");
  //   }
  // },

  // actionSignin: async (req, res) => {
  //   try {
  //     const { username, password } = req.body;
  //     const user = await users.findOne({ username: username });
  //     if (!user) {
  //       req.flash("alertMessage", "User Not Found !");
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/admin/signin");
  //     }
  //     const isPasswordMatch = await bycrypt.compare(password, user.password);
  //     if (!isPasswordMatch) {
  //       req.flash("alertMessage", "Password Not Match !");
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/admin/signin");
  //     }
  //     req.session.user = {
  //       id: user.id,
  //       username: user.username
  //     }
  //     res.redirect('/admin/dashboard');

  //   } catch (error) {
  //     res.redirect("/admin/signin");
  //   }
  // },

  // actionLogout: async (req, res) => {
  //   req.session.destroy();
  //   res.redirect('/admin/signin');
  // },

  viewDashboard: async (req, res) => {
    res.render('admin/dashboard/view_dashboard');
  },
}