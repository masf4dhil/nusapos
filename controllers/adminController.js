const bycrypt = require("bcryptjs");
const fs = require('fs-extra');
const path = require('path');
const users = require('../models/Users');
const tbProduct = require('../models/Products');
const tbBooking = require('../models/Bookings');
const tbTrans = require('../models/Trans');
const tbMember = require('../models/Member');
const tbDiscount = require('../models/Diskon')
const { v4: uuidv4 } = require('uuid');

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
      const member = await tbMember.find()
      const booking = await tbBooking.find()
      .populate({ path: 'productId', select: 'id name price' });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render('admin/dashboard/view_dashboard', {
        title: "Nusa | Dashboard",
        user: req.session.user,
        product,
        booking,
        member,
        alert
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect('/admin/dashboard');
    }
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

  viewTransaction: async (req, res) => {
    try {
      const trans = await tbTrans.find()
      .populate({ path: 'memberId ', select: 'Nama_EKTP' })
      .populate({ path: 'productId ', select: 'name' })
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus , user: req.session.user };
      res.render('admin/transaction/view_transaction', {
        title: "Nusa | Transaction",
        user: req.session.user, 
        trans,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/transaction");
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

  viewDiscount: async (req, res) => {
    try {
      const discount = await tbDiscount.find();
      // untuk alert message dia call component dari partials/message.ejs
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus , user: req.session.user };
      res.render('admin/discount/view_discount', {
        title: "Nusa | Product",
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

  addDiscount: async (req, res) => {
    try {
      const { type, amount, desc, status } = req.body;
      if (type == "" || amount == "" || desc == "" || status == "") {
        req.flash("alertMessage", "Data belum lengkap");
        req.flash("alertStatus", 'danger');
        res.redirect("/admin/discount");
        return
      }

      if (type == "Percent" && amount > 100) {
        req.flash("alertMessage", "Maksimal 100%");
        req.flash("alertStatus", 'danger');
        res.redirect("/admin/discount");
        return
      }

      if (amount < 0) {
        req.flash("alertMessage", "Amount tidak boleh kurang dari 0");
        req.flash("alertStatus", 'danger');
        res.redirect("/admin/discount");
        return
      }
      await tbDiscount.create({ type, amount, desc , status  });
      req.flash("alertMessage", "Succes Add Discount");
      req.flash("alertStatus", "success");
      res.redirect("/admin/discount");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/discount");
    }
  },

  addProduct: async (req, res) => {
    try {
      const { name, merk, type , status, price , description , barcode  } = req.body;
      console.log(name)
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

  editDiscount: async (req, res) => {
    try {
      const { id, type, amount, desc, status } = req.body;
      const discount = await tbDiscount.findOne({ _id : id })

      if (type == "" || amount == "" || desc == "" || status == "") {
        req.flash("alertMessage", "Data belum lengkap");
        req.flash("alertStatus", 'danger');
        res.redirect("/admin/discount");
        return
      }

      if (type == "Percent" && amount > 100) {
        req.flash("alertMessage", "Maksimal 100%");
        req.flash("alertStatus", 'danger');
        res.redirect("/admin/discount");
        return
      }

      if (amount < 0) {
        req.flash("alertMessage", "Amount tidak boleh kurang dari 0");
        req.flash("alertStatus", 'danger');
        res.redirect("/admin/discount");
        return
      }
      
      discount.type = type;
      discount.amount = amount;
      discount.desc = desc;
      discount.status = status;
      await discount.save();
      req.flash("alertMessage", "Succes Update Discount");
      req.flash("alertStatus", "success");
      res.redirect("/admin/discount");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect("/admin/discount");
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

  deleteDiscount: async (req, res) => {
    try {
      const { id } = req.params;
      const discount = await tbDiscount.findOne({_id: id});
      await discount.remove();
      req.flash('alertMessage', 'Success Delete Discount');
      req.flash('alertStatus', 'success');
      res.redirect("/admin/discount")
    } catch(error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/discount');
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
    const booking = await tbBooking.find()
    .populate({ path: 'productId', select: 'id name price' });
    const book = await tbBooking.find({ productId: productId , status : 'avalaible' });
    try {
      if(book){
        req.flash("alertMessage", "Product already choose or not avalaible");
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
        const product = await tbProduct.find({ _id : '5e96cbe292b97300fc903145'});
        product.status = "NOT AVALAIBLE";
        await product.save();
        await tbTrans.create({productId ,select2, time, fdate, tdate, days ,typeDiskon , everyDiskon , jaminan ,subtotal2 ,totalDiskon, totalAll ,desc});
        req.flash("alertMessage", "Succes Add Transaction");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/dashboard`);
        await tbBooking.deleteMany();
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", 'danger');
      res.redirect(`/admin/dashboard`);
    }
  },

}