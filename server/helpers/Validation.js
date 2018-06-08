class Validation {
  
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

