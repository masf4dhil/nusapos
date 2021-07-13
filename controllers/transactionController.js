const bycrypt = require("bcryptjs");
const fs = require('fs-extra');
const path = require('path');
const users = require('../models/User');
const tbProduct = require('../models/product');
const tbTrans = require('../models/transaction');
const tbTransDetail = require('../models/TransactionDetail')
const tbMember = require('../models/Member');
const tbType = require('../models/type');
const tbMerk = require('../models/merk');
const { v4: uuidv4 } = require('uuid');
var mongoose = require('mongoose');
// var _id = mongoose.Types.ObjectId();


module.exports = {
  viewTransaction: async (req, res) => {
    try {
      const trans = await tbTrans.find()
        .populate({ path: 'member_Id ', select: 'name no_member' })
        .populate({ path: 'productId ', select: 'name' })
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

}