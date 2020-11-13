const withAuth = (req, res, next) => {
  if (!req.session.owner_id) {
    res.redirect("/login");
  } else {
    next(); // jump to the next helper
  }
};

module.exports = withAuth;
