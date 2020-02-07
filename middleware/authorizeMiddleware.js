module.exports = function IsInRole(roles) {
  return (
    IsInRole[roles] ||
    (IsInRole[roles] = function(req, res, next) {
      if (typeof role === "string") roles = [roles];
      if (!roles.includes(req.user.role)) {
        return res
          .status(401)
          .json({
            errors: ["You do not have enough rights to perform this action"]
          });
      }
      next();
    })
  );
};
