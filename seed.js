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
    './models/user',
    './models/member',
    './models/merk',
    './models/product',
    './models/transaction',
    './models/transaction_detail',
    './models/discount',
    './models/type',
  ]);

  // Clear specified collections
  seeder.clearModels(['user' , 'member', 'merk','product' , 'transaction', 'transaction_detail', 'discount', 'type' ], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  {
    'model': 'user',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        username: 'admin',
        password: 'rahasia',
        status: 'active',
      },
    ]
  },
  {
    'model': 'member',
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
    'model': 'merk',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('1e96cbe292b97300fc904315'),
        name: 'Canon',
        product_Id: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
        ]
      },
      {
        _id: mongoose.Types.ObjectId('3e96cbe292b97300fc904315'),
        name: 'Nikon',
        product_Id: [
          { _id: mongoose.Types.ObjectId('1e96cbe292b97310fc90bb01') },
        ]
      }
    ]
  },
  {
    'model': 'type',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe392b97300fc904315'),
        name: 'Mirrorless',
        product_Id: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
        ]
      },
      {
        _id: mongoose.Types.ObjectId('2e96dbe292b97300fc904315'),
        name: 'Dslr',
        product_Id: [
          { _id: mongoose.Types.ObjectId('1e96cbe292b97310fc90bb01') },
        ]
      },
      
    ]
  },
  {
    'model': 'product',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01'),
        typeId: mongoose.Types.ObjectId('2e96dbe292b97300fc904315'),
        merkId: mongoose.Types.ObjectId('1e96cbe292b97300fc904315'),
        product_name: 'Canon D100',
        status:"Avalaible",
        description: 'barang ada',
        image:'images/1.PNG',
        price: 12000,
        barcode: 'BR12345',
        discount_id: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc91144d') },
          { _id: mongoose.Types.ObjectId('1e96cbe292b97300fc321242') },
        ] ,
      },
      {
        _id: mongoose.Types.ObjectId('1e96cbe292b97310fc90bb01'),
        typeId: mongoose.Types.ObjectId('5e96cbe392b97300fc904315'),
        merkId: mongoose.Types.ObjectId('3e96cbe292b97300fc904315'),
        product_name: 'Canon 101',
        status:"Avalaible",
        description: 'barang ada',
        image:'images/1.PNG',
        price: 13000,
        barcode: 'BR23463',
        discount_id: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc91144d') },
          { _id: mongoose.Types.ObjectId('1e96cbe292b97300fc321242') },
        ] ,
      },
    ]
  },
  {
    'model': 'discount',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc91144d'),
        typeDiscount:"Discount Rebate",
        amount: 1000,
        description:"diskon hit ramadhan",
        status: "Active",
        product_id: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
          { _id: mongoose.Types.ObjectId('1e96cbe292b97310fc90bb01') },
        ] ,
      },
      {
        _id: mongoose.Types.ObjectId('1e96cbe292b97300fc321242'),
        typeDiscount:"Discount Percent",
        amount: 2000,
        description:"diskon hit puasa lah",
        status: "Active",
        product_id: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
          { _id: mongoose.Types.ObjectId('1e96cbe292b97310fc90bb01') },
        ] ,
      },
    ]
  },
  {
    'model': 'transaction',
    'documents': [  
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc101445'),
        member_Id:{ _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903315') },
        subtotal: 50000,
        total : 40000,
        total_discount : 10000,
        start_date: '11-1-2021',
        end_date: '12-1-2021',
        invoice: "INV0001",
        status: "DONE",
        guarantee: "KTP", 
        note: "transakasi pertama bos",
        transdetail_id: { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc101245') },
      },
    ]
  },
  {
    'model': 'transaction_detail',
    'documents': [  
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc101245'),
        product_Id: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
          { _id: mongoose.Types.ObjectId('1e96cbe292b97310fc90bb01') },
        ],
        discountId: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc91144d') },
          { _id: mongoose.Types.ObjectId('1e96cbe292b97300fc321242') },
        ] ,
        transaction_Id: { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc101445') },
        product_name: "Canon D100",
        price: 5000,
        note: "transakasi pertama ya",
      },

      
    ]
  },

]


