module.exports = (role) => {
  return (req, res, next) => {
    console.log(req.user);
    if (req.user.role != role) {
      // return faile 403
      return res.json("from authorize only function");
    } else {
      next();
    }
  };
};
