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
  ]);

  // Clear specified collections
  seeder.clearModels(['Users' , 'Products' , 'Bookings' , 'Trans','Member' ], function () {

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
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903145'),
        name: 'XD',
        merk: 'cannon',
        type: 'mirror less',
        status: 'avaliable', 
        image:'images/1.PNG',
        price: 12000,
        description: 'barang ada',
        barcode: 'adads',
        bookingId: mongoose.Types.ObjectId('5e96cbe292b97300fc901445'),
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903445'),
        name: 'fujitsu',
        merk: 'nikon',
        type: 'mirror less',
        status: 'avaliable', 
        image:'images/2.PNG',
        price: 13000,
        description: 'barang ada',
        barcode: 'adads',
        bookingId: mongoose.Types.ObjectId('5e96cbe292b97300fc901445'),
      },
      {
        _id: mongoose.Types.ObjectId('1e96cbe292b97300fc903445'),
        name: 'dummy',
        merk: 'japan',
        type: 'mirror less',
        status: 'non avalaible', 
        image:'images/3.PNG',
        price: 11000,
        description: 'barang ada',
        barcode: 'adads',
        bookingId: mongoose.Types.ObjectId('5e96cbe292b97300fc901445'),
      },
    ]
  },
  {
    'model': 'Bookings',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901445'),
        productId:{ _id: mongoose.Types.ObjectId('1e96cbe292b97300fc903445') },
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
        ],
        memberId:{ _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903315') },
        fdate: '11-1-2021',
        tdate: '12-1-2021',
        days: 1,
        jaminan: 'KK',
        diskon: 11111,
        time: '11:02 PM',
        desc: 'barang ada',
      },
    ]
  },

]