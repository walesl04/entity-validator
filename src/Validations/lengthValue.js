export const lengthValue = (value = null, options = {}) => {
  if (!options) {
    return true
  }

  if (value === null || value === undefined) {
    return false
  }

  let length = value.length

  options.Min = parseInt(options.Min)
  options.Max = parseInt(options.Max)

  if (isNaN(options.Min)) return false
  if (isNaN(options.Max)) return false

  if (length < options.Min || length > options.Max) {
    return false
  }

  return true
}
