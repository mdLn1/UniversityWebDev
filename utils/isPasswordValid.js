module.exports = function(password) {
  const re = new RegExp(
    /^.*(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/
  );
  return re.test(password);
};
