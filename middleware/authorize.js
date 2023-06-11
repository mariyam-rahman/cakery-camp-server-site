module.exports = (role) => {
  return (req, res, next) => {
    console.log(req.user);
    if (req.user.role != role) {
      // return faile 403
      return res.json("user does not have the permission to do this shit");
    } else {
      next();
    }
  };
};
