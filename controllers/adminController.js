const bycrypt = require("bcryptjs");
const fs = require('fs-extra');
const path = require('path');
const users = require('../models/User');
const tbProduct = require('../models/product');
const tbTrans = require('../models/Transaction');
const tbMember = require('../models/Member');
const { v4: uuidv4 } = require('uuid');
var list = [];
var flag = '';
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

  viewMember: async (req, res) => {
    try {
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

  



  viewBarcode: async (req, res) => {
    try {
      // const product = await tbProduct.find();
      // console.log("product " + product);
      // untuk alert message dia call component dari partials/message.ejs
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus , user: req.session.user };
      res.render('admin/barcode/view_barcode', {
        title: "Nusa | Barcode",
        user: req.session.user, 
        // product,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/barcode");
    }
  },

  
  viewDashboard: async (req, res) => {
    try {
      const product = await tbProduct.find()
      const member = await tbMember.find()
    if( product.length ==  list.length ){
        // list.splice(0, list.length )
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/dashboard/view_dashboard', {
        title: "Nusa | Dashboard",
        user: req.session.user,
        product,
        // booking,
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
        // booking,
        member,
        alert,
        list
      });
    }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect('/admin/dashboard');
    }
  },
  

  addBook: async (req, res) => {
    const { barcode } = req.body;
    const productSearch = await tbProduct.findOne({ barcode: barcode , status: 'Avalaible' });
    try {       
      //ini ulang dari render view
      const product = await tbProduct.find()
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
        req.flash("alertMessage", "Succes Add Product");
        req.flash("alertStatus", "success");
        list.push(productSearch);
        // productSearch.status = "Not Avalaible";
        // await productSearch.save();
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

  addTrans: async (req, res) => {
    const id = uuidv4();
    const _id = id.slice(0, 8)

    const { productId, fdate, tdate, jaminan ,time , days , select2,subtotal2, typeDiskon, everyDiskon, totalDiskon, totalAll,  desc}  = req.body;
  
    console.log("_id  " + _id);
    console.log("productId  " + productId);
    console.log("jaminan  " + jaminan);
    console.log("time  " + time);
    console.log("fdate  " + fdate);
    console.log("tdate  " + tdate);
    console.log("days  " + days);
    console.log("memberID  " + select2);
    console.log("typeDiskon  " + typeDiskon); 
    console.log("everyDiskon  " + everyDiskon); 
    console.log("subtotal2  " + subtotal2); 
    console.log("totalDiskon  " + totalDiskon); 
    console.log("totalAll  " + totalAll); 
    console.log("desc  " + desc); 
    try {
      if(!productId){
        req.flash("alertMessage", "Product Empty");
        req.flash("alertStatus", "danger");
        res.redirect(`/admin/dashboard`);
      } else {
        //This big shit
        const product = await tbProduct.find({ _id : productId});
        for (var i = 0; i < product.length; i++){
        product[i].status = "NOT AVALAIBLE";
        await product[i].save();
        }
        await tbTrans.create({productId ,select2, time, fdate, tdate, days ,typeDiskon , everyDiskon , jaminan ,subtotal2 ,totalDiskon, totalAll ,desc});
        req.flash("alertMessage", "Succes Add Transaction");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/dashboard`);
        // await tbBooking.deleteMany();
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect(`/admin/dashboard`);
    }
  },

}