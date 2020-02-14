module.exports = function(email) {
    const re = new RegExp(
        /^([\w\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/
      );
  const validDomain =
    email.endsWith("@gre.ac.uk") || email.endsWith("@greenwich.ac.uk");
  return re.test(email) && validDomain ? true : false;
};
