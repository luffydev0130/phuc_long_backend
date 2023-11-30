const parseJsonStr2ObjMiddleware = (fields) => {
  return (req, res, next) => {
    try {
      fields.forEach((field) => {
        req.body[field] = JSON.parse(req.body[field]);
      });
    } catch (error) {
      console.log(error);
    }
    return next();
  };
};

module.exports = parseJsonStr2ObjMiddleware;
