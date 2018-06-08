class Generate {
  
  generateId(length = 5){
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++){
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }
}

module.exports = Generate;

