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
    './models/Products',
    './models/Bookings'
  ]);

  // Clear specified collections
  seeder.clearModels(['Users' , 'Products' , 'Bookings'], function () {

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
        barcode: 'adads'
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
        barcode: 'adads'
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
        barcode: 'adads'
      },
    ]
  },
  {
    'model': 'Bookings',
    'documents': [  
      {
        _id: mongoose.Types.ObjectId('4e96cbe292b97300fc903445'),
        productId: {
           _id: mongoose.Types.ObjectId('1e96cbe292b97300fc903445'),
           name: 'dummy',
           merk: 'japan',
           type: 'mirror less',
           status: 'non avalaible', 
           price: 11000,
           description: 'barang ada',
           barcode: 'adads'
          },
      },
    ]
  },

]