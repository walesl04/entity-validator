export const objectNotEmpty = (value = null) => {
  
  if (value === null || value === undefined) {
    return false
  }

  return Object.keys(value).length > 0
}
