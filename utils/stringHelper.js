function isAlphaNumeric(str) {
  // Regex to check valid
  // alphanumeric string
  let regex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/)

  // if str
  // is empty return false
  if (str == null) {
    return 'false'
  }

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) == true) {
    return 'true'
  } else {
    return 'false'
  }
}

module.exports = { isAlphaNumeric }
