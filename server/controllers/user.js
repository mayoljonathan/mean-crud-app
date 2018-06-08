const User = require('../models/User');
const { JSONResponse } = require('../helpers');

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
    const _user = new User(req.body);

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
  } else if (req.body.entry === 'register'){
    const _user = new User(req.body);
    User.create(_user, (error, user) => {
      if (error) { 
        // Parse the error created from mongoDB to own error response
        let _error = new JSONResponse().error(error);
        return res.status(_error.status).send(_error);
      }

      // Convert non-configurable 'user' object from mongodb to plain JS object so I can delete password key
      user = user.toObject();
      delete user.password;

      return res.send(new JSONResponse().success('User created successfully.', {user: user}));
    });
  } else {
    res.send(new JSONResponse().error({})); 
  }

}