const express = require('express');
const router = express.Router();

const { UserController }  = require('../controllers');

// router.get('/', UserController.getAllUser);
// router.get('/:id', UserController.getUser);

// For logging in and registering
router.post('/', UserController.entryUser);


  // User.find({}, (err, users) => {
  //   if (err) { return res.error(new JSONResponse().error(500, err));}
  //   res.send(new JSONResponse().success(users));
  // });

  // var test = new User({
  //   name: 'Chris',
  //   username: 'dddd',
  //   password: 'password' 
  // });

  // test.checkUsername('dddd', function(user){
  //   res.send(user);
  // });

  // User.find({ username: 'dddd' }, function(err, user){
  //   if (err) throw err;
  //   res.send(user);
  // });


  // // call the custom method.
  // test.createID(function(err, id) {
  //   if (err) throw err;
  // });

  // // // call the built-in save method to save to the database
  // test.save(function(err) {
  //   if (err) throw err;
  //   console.log('User saved successfully!');
  // });
// });

// Get a user using id
// router.get('/:id', (req, res) => {
//   User.find({ id: req.params.id}, (err, user) => {
//     if (err) { return res.error(new JSONResponse().error(500, err)); }
//     res.send(new JSONResponse().success(user));
//   });
// });


// Add a user
// router.post('/', (req, res, next) => {
//   // var _user = new User(req.body);

//   // _user.checkUsername(req.body.username, result => {
//   //   if (result.length >= 1) { 
//   //     res.status(409);
//   //     res.send({
//   //       error: "Username is already taken."
//   //     });
//   //   } else {

//       // Create the user
//       User.create(_user, (err, user) => {
//         if (err) { return res.send(new JSONResponse().error(500, err)); }
//         res.send(new JSONResponse().success({message: "user created successfully", user: user}));
//       });

//   //   }

//   // });

// });

module.exports = router;
