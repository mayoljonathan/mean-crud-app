const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const { Validation, Generate } = require('../helpers');


var UserSchema = new Schema({
  id: { 
    type: String, 
    unique: true 
  },
  name: {
    type: String,
    validate: new Validation().hasSpecialCharacters(false),
    required: [true, 'Name is required.'],
    minlength: [10, 'Name must be at least 10 characters.'],
    maxlength: [50, 'Name must not be greater than 50 characters.'],
    trim: true,
  },
  username: { 
    type: String, 
    unique: true, 
    validate: new Validation().hasSpecialCharacters(),
    required: [true, 'Username is required.'], 
    minlength: [6, 'Username must be at least 6 characters.'],
    maxlength: [50, 'Username must not be greater than 50 characters.'],
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required.'],
    minlength: [6, 'Password must be at least 6 characters.']
  },
  created_at: Date,
  updated_at: Date
}, {strict: false});


// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
// UserSchema.methods.checkUsername = function (username, next) {
//   // get the user with specified username
//   User.find({ username: username }, function(err, user){
//     if (err) throw err;
//     next(user);
//   });
// }


//authenticate input against database
UserSchema.statics.authenticate = (username, password , callback) => {
  User.findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        console.log('Error in mongoDB');
        console.log(err);
        return callback({
          status: 500,
          errorName: 'ServerError',
          errors: err
        });
      } else if (!user) {
        // Wrong username
        return callback({
          status: 401,
          errorName: 'UserNotFound',
          message: 'No users found in the credentials given.'
        });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        // if password recieved is same with the hashed password in the db
        if (result) {
          return callback(null, user);
        }
        // Wrong password
        return callback({
          status: 401,
          errorName: 'UserNotFound',
          message: 'No users found in the credentials given.'
        });
      });
    });
}

// UserSchema.pre('validate', (next) => {
//   console.log('Before validation');
//   console.log(next);
//   next();
// });

// on every save, add the date
// hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  let user = this;

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) { return next(err) }

    // Set the password to the hashed password
    user.password = hash;

    // get the current date
    const currentDate = new Date();
  
    // change the updated_at field to current date
    this.updated_at = currentDate;
  
    // if created_at doesn't exist, it means its a new user, add an id and created_at field
    if (!this.created_at) {
      this.id = new Generate().generateId(5);
      this.created_at = currentDate;
    }
    next();

  });
  
});

// UserSchema.post('save', function(error, doc, next) {
//   console.log('Error in saving')  ;
//   console.log(error);
//   console.log(doc);
//   next();
// });

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
module.exports = User;
