const bycrypt = require("bcryptjs");
const fs = require('fs-extra');
const path = require('path');
const users = require('../models/Users');
const tbProduct = require('../models/Products');
const tbBooking = require('../models/Bookings');
const tbTrans = require('../models/Trans');

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

  viewDashboard: async (req, res) => {
    try {
      const product = await tbProduct.find()
      const booking = await tbBooking.find()
      .populate({ path: 'productId', select: 'id name' });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/dashboard/view_dashboard', {
        title: "Nusa | Dashboard",
        user: req.session.user,
        product,
        booking,
        alert
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect('/admin/dashboard');
    }
  },

  viewProduct: async (req, res) => {
    try {
      const product = await tbProduct.find();
      console.log("product " + product);
      // untuk alert message dia call component dari partials/message.ejs
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus , user: req.session.user };
      res.render('admin/product/view_product', {
        title: "Nusa | Product",
        user: req.session.user, 
        product,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/product");
    }
  },

  addProduct: async (req, res) => {
    try {
      const { name, merk, type , status, price , description , barcode  } = req.body;
      await tbProduct.create({ name, merk, type , status,  image: `images/${req.file.filename}` , price , description , barcode  });
      req.flash("alertMessage", "Succes Add Product");
      req.flash("alertStatus", "success");
      res.redirect("/admin/product");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/product");
    }
  },
  editProduct: async (req, res) => {
   try {
    const { id , name, merk, type , status, price , description , barcode  } = req.body;
     const product = await tbProduct.findOne({ _id : id});
     if(req.file == undefined){
       product.name = name;
       product.merk = merk;
       product.type = type;
       product.status = status;
       product.price = price;
       product.description = description;
       product.barcode = barcode;
       await product.save();
       req.flash("alertMessage", "Succes Update Product");
       req.flash("alertStatus", "success");
       res.redirect("/admin/product");
     }else {
       await fs.unlink(path.join(`public/${product.image}`));
       product.name = name;
       product.merk = merk;
       product.type = type;
       product.status = status;
       product.image = `images/${req.file.filename}`
       product.price = price;
       product.description = description;
       product.barcode = barcode;
       await product.save();
       req.flash("alertMessage", "Succes Update Product");
       req.flash("alertStatus", "success");
       res.redirect("/admin/product");
     }
   } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", 'danger');
    res.redirect("/admin/product");
   }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await tbProduct.findOne({ _id: id });
      await fs.unlink(path.join(`public/${product.image}`));
      await product.remove();
      req.flash('alertMessage', 'Success Delete Product');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/product');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/product');
    }
  },

  addBook: async (req, res) => {
    const { productId } = req.body;
    const book = await tbBooking.findOne({ productId: productId });
    try {
      if(book){
        req.flash("alertMessage", "Product Already Choose");
        req.flash("alertStatus", "danger");
        res.redirect(`/admin/dashboard`);
      } else {
        await tbBooking.create({ productId });
        req.flash("alertMessage", "Succes Add Product");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/dashboard`);
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect(`/admin/dashboard`);
    }
  },

  addTrans: async (req, res) => {
    const { productId, dateIn, dateOut, jaminan ,time}  = req.body;
    var totalDate = dateOut - dateIn;
    console.log("jaminan  " + jaminan);
    console.log("time  " + time);
    console.log("dateIn  " + dateIn);
    console.log("dateOut  " + dateOut);
    console.log("totalDate  " + totalDate);
    // try {
    //   if(!productId){
    //     req.flash("alertMessage", "Product Empty");
    //     req.flash("alertStatus", "danger");
    //     res.redirect(`/admin/dashboard`);
    //   } else {
    //     await tbTrans.create({ productId });
    //     req.flash("alertMessage", "Succes Add Transaction");
    //     req.flash("alertStatus", "success");
    //     res.redirect(`/admin/dashboard`);
    //   }
    // } catch (error) {
    //   req.flash("alertMessage", `${error.message}`);
    //   req.flash("alertStatus", 'danger');
    //   res.redirect(`/admin/dashboard`);
    // }
  },

}