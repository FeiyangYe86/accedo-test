/**
 * Errors indicating a failure in fetching data from api
 * @param string message
 */
function ApiLoadingError (message) {
  this.name = 'ApiLoadingError'
  this.stack = (new Error()).stack
  this.message = message
}

ApiLoadingError.prototype = new Error()
ApiLoadingError.constructor = ApiLoadingError

/**
 * Errors indicating a failure in finding vue element
 * @param string message
 */
function ElementNotFoundError (message) {
  this.name = 'ElementNotFoundError'
  this.stack = (new Error()).stack
  this.message = message
}

ElementNotFoundError.prototype = new Error()
ElementNotFoundError.constructor = ApiLoadingError

export { ApiLoadingError, ElementNotFoundError }
