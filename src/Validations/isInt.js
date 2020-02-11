export const isInt = (value, options) => {
  if (!options) {
    return true
  }

  if (value === undefined || value === null) {
    return false
  }
  var tst = new RegExp(/^\d+$/)
  return tst.test(value.toString())
}
