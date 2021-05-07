var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

seeder.connect('mongodb://localhost:27017/nusa', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, function () {

  // Load Mongoose models
  seeder.loadModels([
    './models/User',
    './models/Member',
    './models/Merk',
    './models/Product',
    './models/Transaction',
    './models/TransactionDetail',
    './models/Discount',
    './models/Type',
  ]);

  // Clear specified collections
  seeder.clearModels(['User' , 'Member', 'Merk','Product' , 'Transaction', 'Discount',"TransactionDetail", 'Type' ], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  {
    'model': 'User',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        name: 'admin',
        password: 'rahasia',
        status: 'active',
      },
    ]
  },
  {
    'model': 'Member',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903315'),
        no_member: "NK000326",
        name: 'fadhil',
        no_hp: 0893733342323,
        username_ig: '@alfatayah',
        identity: 21312312313123,
        status: 1,
      },
    ]
  },
  {
    'model': 'Merk',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc904315'),
        name: 'Canon'
      },
      {
        _id: mongoose.Types.ObjectId('2e96cbe292b97300fc904315'),
        name: 'Nikon'
      }
    ]
  },
  {
    'model': 'Type',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe392b97300fc904315'),
        name: 'Mirrorless'
      },
      {
        _id: mongoose.Types.ObjectId('2e96dbe292b97300fc904315'),
        name: 'Dslr'
      }
    ]
  },
  {
    'model': 'Product',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01'),
        typeId: mongoose.Types.ObjectId('5e96cbe392b97300fc904315'),
        merkId: mongoose.Types.ObjectId('5e96cbe292b97300fc904315'),
        product_name: 'Canon D100',
        status:"Avalaible",
        description: 'barang ada',
        image:'images/1.PNG',
        price: 12000,
        barcode: '89981115',
      },
      {
        _id: mongoose.Types.ObjectId('1e96cbe292b97310fc90bb01'),
        typeId: mongoose.Types.ObjectId('5e96cbe392b97300fc904315'),
        merkId: mongoose.Types.ObjectId('5e96cbe292b97300fc904315'),
        product_name: 'Canon 101',
        status:"Avalaible",
        description: 'barang ada',
        image:'images/1.PNG',
        price: 13000,
        barcode: '89911115',
      },
    ]
  },
  {
    'model': 'Discount',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc91144d'),
        typeDiskon:"Diskon",
        amount: 1000,
        desc:"diskon hit ramadhan",
        status: "Not Avalaible"
      },
    ]
  },
  {
    'model': 'Transaction',
    'documents': [  
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc101445'),
        memberId:{ _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903315') },
        total_product: 2,
        total_price : 100000,
        total_discount : 5000,
        start_date: '11-1-2021',
        end_date: '12-1-2021',
        invoice: "INV0001",
        status: "DONE",
        note: "transakasi pertama bos",
      },
    ]
  },
  {
    'model': 'TransactionDetail',
    'documents': [  
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc101245'),
        productId: { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
        transaction_Id: { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc101445') },
        discount_Id: { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc91144d') },
        product_name: "Canon D100",
        price: 5000,
        note: "transakasi pertama ya",
      },
    ]
  },

]


