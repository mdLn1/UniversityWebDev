module.exports = function(password) {
  const re = new RegExp(
    /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
  );
  return re.test(password);
};
