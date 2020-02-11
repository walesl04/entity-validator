export const regex = (value, options) => {
  if (value === undefined || value === null) {
    return true
  }
  var rgx = new RegExp(options)

  return rgx.test(value)
}
