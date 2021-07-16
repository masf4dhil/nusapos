const bycrypt = require("bcryptjs");
const fs = require('fs-extra');
const path = require('path');
const users = require('../models/user');
const tbProduct = require('../models/product');
const tbTrans = require('../models/transaction');
const tbMember = require('../models/member');
const tbDiscount = require('../models/discount');
const tbType = require('../models/type');
const tbMerk = require('../models/merk');
const { v4: uuidv4 } = require('uuid');
var list = [];
module.exports = {
  
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render('index', {
          alert,
          title: "Nusa | Login"
        });
      } else {
        res.redirect('/admin/dashboard');
      }
    } catch (error) {
      res.redirect('/admin/signin');
    }
    
  },

  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await users.findOne({ username: username });
      if (!user) {
        req.flash("alertMessage", "User Not Found !");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      const isPasswordMatch = await bycrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "Password Not Match !");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      req.session.user = {
        id: user.id,
        username: user.username
      }
      res.redirect('/admin/dashboard');

    } catch (error) {
      res.redirect("/admin/signin");
    }
  },

  actionLogout: async (req, res) => {
    req.session.destroy();
    res.redirect('/admin/signin');
  },

  viewType: async (req, res) => {
    try {
      list.splice(0, list.length )
      const type = await tbType.find()
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus , user: req.session.user };
      res.render('admin/type/view_type', {
        title: "Nusa | Type",
        user: req.session.user, 
        type,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/type");
    }
  },
  
  viewMerk: async (req, res) => {
    try {
      list.splice(0, list.length )
      const merk = await tbMerk.find()
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus , user: req.session.user };
      res.render('admin/merk/view_merk', {
        title: "Nusa | Merk",
        user: req.session.user, 
        merk,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/merk");
    }
  },

  viewMember: async (req, res) => {
    try {
      list.splice(0, list.length )
      const member = await tbMember.find();
      // untuk alert message dia call component dari partials/message.ejs
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus , user: req.session.user };
      res.render('admin/member/view_member', {
        title: "Nusa | Product",
        user: req.session.user, 
        member,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/member");
    }
  },

  viewDiscount: async (req, res) => {
    try {
      list.splice(0, list.length )
      const discount = await tbDiscount.find()
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus , user: req.session.user };
      res.render('admin/discount/view_discount', {
        title: "Nusa | Discount",
        user: req.session.user, 
        discount,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/discount");
    }
  },



  viewProduct: async (req, res) => {
    try {
      list.splice(0, list.length )
      const product = await tbProduct.find()
      .populate({ path: 'typeId', select: 'id name' })
      .populate({ path: 'merkId', select: 'id name' })
      const merk = await tbMerk.find();
      const type = await tbType.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus , user: req.session.user };
      res.render('admin/product/view_product', {
        title: "Nusa | Product",
        user: req.session.user, 
        merk,
        type,
        product,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/product");
    }
  },

  
  viewDashboard: async (req, res) => {
    try {
      const product = await tbProduct.find()
      .populate({ path: 'discount_id', select: 'typeDiscount amount' })
      const member = await tbMember.find()
    if( product.length ==  list.length ){
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/dashboard/view_dashboard', {
        title: "Nusa | Dashboard",
        user: req.session.user,
        product,
        member,
        alert,
        list
      });
    } else{
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/dashboard/view_dashboard', {
        title: "Nusa | Dashboard",
        user: req.session.user,
        product,
        member,
        alert,
        list
      });
    }
    } catch (error) {
      console.log("error " , error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect('/admin/dashboard');
    }
  },
  

  addBook: async (req, res) => {
    const { barcode } = req.body;
    const productSearch = await tbProduct.findOne({ barcode: barcode , status: 'Avalaible' })
    .populate("discount_id")

    try {       
      //ini ulang dari render view
      const product = await tbProduct.find()
      .populate({ path: 'discount_id', select: 'typeDiscount amount' })
      
      const member = await tbMember.find()
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };


      const mapList = list.map(x => x.barcode)
      if(!productSearch ||  mapList.includes(barcode) ){
        req.flash("alertMessage", "Product already choose or not avalaible");
        req.flash("alertStatus", "danger");
        res.redirect(`/admin/dashboard`);
      } else {
        list.push(productSearch);
        res.render('admin/dashboard/view_dashboard', {
          title: "Nusa | Dashboard",
          user: req.session.user,
          product,
          list,
          member,
          alert
        });
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect(`/admin/dashboard`);
    }
  },

 

}