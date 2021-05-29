const bycrypt = require("bcryptjs");
const fs = require('fs-extra');
const path = require('path');
const users = require('../models/User');
const tbProduct = require('../models/product');
const tbTrans = require('../models/Transaction');
const tbMember = require('../models/Member');
const tbtype = require('../models/type');
const tbmerk = require('../models/merk');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  viewProduct: async (req, res) => {
    try {
      const product = await tbProduct.find()
      // .populate({ path: 'typeId', select: 'id name' })
      .populate({ path: 'merkId', select: 'id name' })
      console.log("data product " , product);
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

}