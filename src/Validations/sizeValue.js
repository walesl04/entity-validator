export const sizeValue = (value = null, options = {}) => {
  if (!options) {
    return true
  }

  if (value === null || value === undefined) {
    return false
  }

  options.Min = parseInt(options.Min)
  options.Max = parseInt(options.Max)

  if (isNaN(options.Min)) return false
  if (isNaN(options.Max)) return false

  if (value < options.Min || value > options.Max) {
    return false
  }

  return true
}
