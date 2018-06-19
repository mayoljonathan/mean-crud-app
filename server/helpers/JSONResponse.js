class JSONResponse {

  constructor(userDefined = false){
    this.userDefined = userDefined;
  }

  success(message, data, status = 200) {
    return {
      status: status,
      message: message,
      data: data
    }
  }

  error(data) {
    // Container for error fields
    let _errors = [];

    if (!this.userDefined) {
      // Parse the error created in mongoose
      // If unique/duplicate key in collection occurs
      if (data.name === 'MongoError' && data.code === 11000) {
        // Get the field in the error message created by mongoose duplicate key
        let errorMessage = data.message;
        let tmp = errorMessage.search('index:');
        errorMessage = errorMessage.slice(tmp + 7);
        
        let suffix = errorMessage.search('_1');
        let field = errorMessage.slice(0, suffix);
        
        data.message = `${field.charAt(0).toUpperCase() + field.slice(1)} is already used.`;
        data.status = 409;
        data.errorName = 'ValidationError';
        
        _errors.push({
          field: field,
          message: data.message
        });
      
      // A normal error object return in mongoose validation
      } else if (data){
        data.status = 400;
        data.errorName = data.name;
        data.message = data._message;

        for (let field in data.errors) {
          // In case error message dont start with first letter capitalized
          let errorMessage = data.errors[field]['message'];
          errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
    
          _errors.push({
            field: field,
            message: errorMessage
          });
        }
      }

    }

    let response = {
      status: data.status ? data.status : 500,
      errorName: data.errorName || 'UnknownError',
      message: data.message || 'An error has occured.',
      errors: _errors.length === 0 ? null : _errors
    }

    return response;
  }
}

module.exports = JSONResponse;

// Return something like this
// #success
// {
//   "data": {
//     "message": "user created successfully",
//     "key": {
//       "fields": "1"
//     }
//   }
// }
// 
// #fail
// {
//    "code": 409,
//    "message": "ValidationError",
//    "errors": [
//      {
//          "field": "username",
//          "message": "Duplicate value of username."
//      }
//    ]
// }

// #format for userDefined object
// {
//   code: 401,
//   message: 'test'
// }