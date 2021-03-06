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
    './models/users',
    './models/products'
  ]);

  // Clear specified collections
  seeder.clearModels(['users'], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  {
    'model': 'users',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        username: 'admin',
        password: 'rahasia',
      },
    ]
  },
  {
    'model': 'products',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903145'),
        nameProduct: 'XD',
        merk: 'cannon',
        type: 'mirror less',
        status: 'avaliable', 
        image:'asdasd',
        price: 12000,
        description: 'barang ada',
        barcode: 'adads'
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903445'),
        nameProduct: 'fujitsu',
        merk: 'nikon',
        type: 'mirror less',
        status: 'avaliable', 
        image:'asdasd',
        price: 13000,
        description: 'barang ada',
        barcode: 'adads'
      },
      {
        _id: mongoose.Types.ObjectId('1e96cbe292b97300fc903445'),
        nameProduct: 'dummy',
        merk: 'japan',
        type: 'mirror less',
        status: 'non avalaible', 
        image:'asdasd',
        price: 11000,
        description: 'barang ada',
        barcode: 'adads'
      },
    ]
  }

]