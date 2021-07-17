const bycrypt = require("bcryptjs");
const fs = require('fs-extra');
const path = require('path');
const users = require('../models/user');
const tbProduct = require('../models/product');
const tbTrans = require('../models/transaction');
const tbTransDetail = require('../models/transaction_detail')
const tbMember = require('../models/member');
const tbType = require('../models/type');
const tbMerk = require('../models/merk');
const { v4: uuidv4 } = require('uuid');
var mongoose = require('mongoose');


module.exports = {
  viewTransaction: async (req, res) => {
    try {
      const trans = await tbTrans.find()
        .populate({ path: 'member_Id ', select: 'name no_member' })
        console.log("trans " , trans);
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus, user: req.session.user };
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

  showDetailTransaction: async (req, res) => {
    const { id } = req.params;
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const TransDetail = await tbTransDetail.findOne({ _id: id })
      .populate("transaction_Id")
      .populate("product_Id")
      .populate("discountId");
      res.render("admin/transaction/show_detail_transaction", {
        title: "Staycation | Detail Transaction",
        user: req.session.user,
        TransDetail,
        alert
      });
    } catch (error) {
      console.log("error  " , error);
      res.redirect(`/admin/transaction`);
    }
  },

  showPrintTransaction: async (req, res) => {
    const { id } = req.params;
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const TransDetail = await tbTransDetail.findOne({ _id: id })
      .populate("transaction_Id")
      .populate("product_Id")
      .populate("discountId");
      res.render("admin/transaction/print", {
        title: "Staycation | Print Transaction",
        user: req.session.user,
        TransDetail,
        alert
      });
    } catch (error) {
      console.log("error  " , error);
      res.redirect(`/admin/transaction/print`);
    }
  },

  addTrans: async (req, res) => {
    const id = uuidv4();
    const _id = id.slice(0, 8)

    const { productId, fdate, tdate, jaminan ,time , days , select2,subtotal2,diskonID, typeDiskon,diskonDataValue, totalDiskon, totalAll,  desc}  = req.body;
   

    console.log("_id  " + _id);
    console.log("productId  " + productId);
    console.log("jaminan  " + jaminan);
    console.log("time  " + time);
    console.log("fdate  " + fdate);
    console.log("tdate  " + tdate);
    console.log("days  " + days);
    console.log("memberID  " + select2);
    console.log("diskonID  " + diskonID);
    console.log("typeDiskon  " + typeDiskon); 
    console.log("diskonDataValue  " + diskonDataValue); 
    console.log("subtotal2  " + subtotal2); 
    console.log("totalDiskon  " + totalDiskon); 
    console.log("totalAll  " + totalAll); 
    console.log("desc  " + desc); 
    // try {
    //   if(!productId){
    //     req.flash("alertMessage", "Product Empty");
    //     req.flash("alertStatus", "danger");
    //     res.redirect(`/admin/dashboard`);
    //   } else {
    //     //This big shit
    //     const product = await tbProduct.find({ _id : productId});
    //     for (var i = 0; i < product.length; i++){
    //     product[i].status = "NOT AVALAIBLE";
    //     await product[i].save();
    //     }
    //     await tbTrans.create({productId ,select2, time, fdate, tdate, days ,typeDiscount , everyDiskon , jaminan ,subtotal2 ,totalDiskon, totalAll ,desc});
    //     req.flash("alertMessage", "Succes Add Transaction");
    //     req.flash("alertStatus", "success");
    //     res.redirect(`/admin/dashboard`);
    //     // await tbBooking.deleteMany();
    //   }
    // } catch (error) {
    //   req.flash("alertMessage", `${error.message}`);
    //   req.flash("alertStatus", 'danger');
    //   res.redirect(`/admin/dashboard`);
    // }
  },

}