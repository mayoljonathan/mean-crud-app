const ContentTypeChecker = function(req, res, next, data){
  const _contentType = req.headers['content-type'];
  if(!_contentType || _contentType.indexOf(data) !== 0){
    // return res.sendStatus(400);
  }
  // next();
}

module.exports = ContentTypeChecker;