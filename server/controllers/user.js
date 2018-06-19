
const User = require('../models/User');
const { JSONResponse, Validation } = require('../helpers');

// Get all users
module.exports.getAllUser = (req, res) => {
  User.find({}, (err, users) => {
    if (err) { return res.send(new JSONResponse().error(500, err));}
    res.send(new JSONResponse().success(users));
  });
};

// Get a single user
module.exports.getUser = (req, res) => {
  User.findOne({ id: req.params.id}, (err, user) => {
    if (err) { return res.send(new JSONResponse().error(500, err)); }
    res.send(new JSONResponse().success(user));
  });
};

module.exports.entryUser = (req, res, next) => {

  if (req.body.entry === 'login') {

    // Remove required field to name property so that it wont validate the name property
    User.schema.path('name').required(false);

    const _user = new User(req.body);

    _user.validate().then(result => {
      console.log('Validation success');
      console.log(result);

      User.authenticate(_user.username, _user.password, (error, user) => {
        if (error || !user) {
          return res.status(error.status).send(error);
        } else {
          req.session.userId = user._id;
  
          // Convert non-configurable 'user' object from mongodb to plain JS object so I can delete password key
          user = user.toObject();
          delete user.password;
  
          return res.send(new JSONResponse().success('User granted access.', {user: user}));
        }
      });

    }).catch(error => {
      console.log('Validation error');
      // Parse the error created from mongoDB to own error response
      let _error = new JSONResponse().error(error);
      return res.status(_error.status).send(_error);
    });

  } else if (req.body.entry === 'register'){

    let nameSchema = User.schema.path('name');
    
    // Check if path name already has a required validator
    // Adding a required field if it doesnt have a required validator yet
    // Reason: Validators of name will keep adding required(added in the array of validators) even there was a required validator already
    if (nameSchema.validators.filter(x => x.type === 'required').length === 0) {
      // Add a required field to name property
      User.schema.path('name').required(true, 'Name is required');
    }
   
    const _user = new User(req.body);
    
    _user.save((error, user) => {
      if (error) { 
        // Parse the error created from mongoDB to own error response
        console.log('Error in creating user : in controller');
        let _error = new JSONResponse().error(error);
        return res.status(_error.status).send(_error);
      }

      // Convert non-configurable 'user' object from mongodb to plain JS object so I can delete password key
      user = user.toObject();
      delete user.password;

      return res.send(new JSONResponse().success('User created successfully.', {user: user}));
    });

  } else {
    // When request was sent but req.body.entry is not either login/register
    res.send(new JSONResponse(true).error({
      status: 400,
      errorName: 'NotRecognized',
      message: 'Entry value is not recognized. ',
    })); 
  }

}