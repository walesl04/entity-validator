export const email = (value = null, options) => {
  if (value == null || value == '') {
    return true
  }

  var exp = new RegExp("[A-Za-z0-9\\._-]+@[A-Za-z0-9]+\\.[A-Za-z]+");
  var data = value.trim();

  if (options) {
    return exp.exec(data);
  }
  else {
    return true;
  }
}
