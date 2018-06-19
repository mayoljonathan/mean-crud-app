class Validation {
  
  

  constructor(model, data, options = {}) {
    this.errors = [];

    this.model = model;
    this.data = data;
    // when options is {} , all fields will be validated
    this.options = options || {
      include: [], //list of fields to be included only when validating 
      exclude: [], //list of fields to be excluded when validating  
    }
  }

  // Execute's the validation for the model passed
  async execute(){
    // return new Promise(resolve => {
      // let errors = [];
      // let model = this.model;
      // model_property is the property in the schema like id,name,username,password
      let model_property = Object.keys(this.model);
      
      if (this.options.hasOwnProperty('include')) {
        model_property = await model_property.filter(key => this.options.include.indexOf(key) !== -1).map(x => x);
        
        // Do the validation for each key that is only included
        model_property.forEach(key => {
          _validate(key, this).then(res => {
            console.log('Done _validating');
            console.log(res);
          }).catch(err => {
            console.log('DONE validate but got errors');
            console.log(err);
          });
        });
      }
  
      // o is the class itself
      async function _validate(key, o) {
        // return new Promise((resolve, reject) => {
          var that = o;
          let model_validators = [];
          // not yet supported
          // enum
          let validators = ['required','minlength','maxlength','min','max'];
          // console.log(`Validating for: ${key}`);
          // Get all validators and requirements in the model in this key/property
          // model_validators = await model.filter(key => validators.include.indexOf(key) !== -1).map(x => x);
    
          // Get keys from the object
          let props = Object.keys(that.model[key]);
    
          // model_schemaType_options are properties used for validation like in the validators array
          let model_schemaType_options = props.filter(option => validators.indexOf(option) !== -1).map(x => x);
          // console.log(model_schemaType_options);
          // console.log(`key: ${model_schemaType_options}` );
    
          // Validate now
          await model_schemaType_options.forEach(validator => {
            // Always specify the custom message in the ModelSchema like required: [true, 'This field is required']
            if (validator === 'required' && that.model[key][validator][0] === true) {
              if (that.isEmpty(that.data[key])) {
                that.errors.push({
                  field: key,
                  message: that.model[key][validator][1]
                });
              }
            }
            
          });

          console.log('DO IT!');
          
          // if (that.errors.length === 0) {
          //   resolve('NO ERRORS!!!');
          // } else {
          //   console.log('ERRORS FOUND');
          //   console.log(that.errors);
          //   reject(that.errors);
          // }

        // });
  
      }

    // });

    // if (this.options.hasOwnProperty('include')) {
    //   if (this.options.include.length > 0) {
        
    //     this.options.include.forEach(field => {

    //     });

    //   }
    // }

    


    // else {
    //   console.log('validate all');
    // }

  }


  isEmpty(string) {
    return string.trim().length === 0;
  }

  hasSpecialCharacters(includeWhiteSpace = true){
    return {
      validator: (data) => {
        if(includeWhiteSpace) {
          return !/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(data);
        }
        return !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(data);
      },
      message: '{PATH} contains special characters.'
    }
  }

}

module.exports = Validation;

