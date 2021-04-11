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
    './models/Users',
    './models/Member',
    './models/Products',
    './models/Bookings',
    './models/Trans',
    './models/Diskon',
  ]);

  // Clear specified collections
  seeder.clearModels(['Users' , 'Products' , 'Bookings' , 'Trans','Member', 'Diskon' ], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  {
    'model': 'Users',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        username: 'admin',
        password: 'rahasia',
      },
    ]
  },
  {
    'model': 'Member',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903315'),
        NIK: 21312312313123,
        NoHP: 0893733342323,
        Instagram: '@alfatayah',
        Nama_EKTP: 'fadhil',
        Status: 1,
        No_Member: 234423423,
        transId : [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc101445') },
        ],
      },
    ]
  },
  {
    'model': 'Products',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01'),
        name: 'XD',
        merk: 'cannon',
        type: 'mirror less',
        status: 'avalaible', 
        image:'images/1.PNG',
        price: 12000,
        description: 'barang ada',
        barcode: '89981115',
        bookingId: mongoose.Types.ObjectId('5e96cbe292b97300fc901445'),
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903445'),
        name: 'fujitsu',
        merk: 'nikon',
        type: 'mirror less',
        status: 'not avalaible', 
        image:'images/2.PNG',
        price: 13000,
        description: 'barang ada',
        barcode: '89981111',
        bookingId: mongoose.Types.ObjectId('5e96cbe292b97300fc901445'),
      },
      {
        _id: mongoose.Types.ObjectId('1e96cbe292b97300fc903445'),
        name: 'dummy',
        merk: 'japan',
        type: 'mirror less',
        status: 'avalaible', 
        image:'images/3.PNG',
        price: 11000,
        description: 'barang ada',
        barcode: '89981111',
        bookingId: mongoose.Types.ObjectId('5e96cbe292b97300fc901445'),
      },
    ]
  },
  {
    'model': 'Bookings',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901445'),
        productId:[{ _id: mongoose.Types.ObjectId('1e96cbe292b97300fc903445') }],
      },

    ]
  },
  {
    'model': 'Diskon',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc91144d'),
        typeDiskon:"",
        amount: 0,
        desc:"",
        transId: [

        ],
      },
    ]
  },
  {
    'model': 'Trans',
    'documents': [  
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc101445'),
        productId: [
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90bb01') },
          { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903445') },
        ],
        memberId:{ _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903315') },
        time: '11.30 PM',
        fdate: '11-1-2021',
        tdate: '12-1-2021',
        days: 1,
        typeDiskon: ['Potongan' , 'Persen'],
        diskon:[1200, 1200],
        jaminan: 'KK',
        subtotal: 11111,
        totalDiskon: 11111,
        total: 1111,
        desc:['as' , 'Perseasn'],
      },
    ]
  },

]