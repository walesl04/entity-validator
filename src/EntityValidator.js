// The validators
import { ConfigGlobal } from './Globalization/Config'
import { cpf } from './Validations/cpf'
import { email } from './Validations/email'
import { isInt } from './Validations/isInt'
import { isNotNull } from './Validations/isNotNull'
import { isNull } from './Validations/isNull'
import { lengthValue } from './Validations/lengthValue'
import { objectNotEmpty } from './Validations/objectNotEmpty'
import { regex } from './Validations/regex'
import { sizeValue } from './Validations/sizeValue'

export const EntityValidator = (function () {
  let _entity = {}
  let _validators = {}
  const defaultLang = 'pt-br'

  function EntityValidator(entity = {}, validators = {}, lang = null) {
    _entity = Object.assign({}, entity)
    _validators = Object.assign({}, validators)
    EntityValidator.config('globalization', lang || defaultLang)
  }

  EntityValidator.config = (prop, value) => {
    if (value === null || value === undefined) {
      return EntityValidator.config[prop]
    }

    EntityValidator.config[prop] = value
  }

  EntityValidator.globalMsg = ConfigGlobal

  EntityValidator.fn = { cpf, email, isInt, isNotNull, isNull, lengthValue, objectNotEmpty, regex, sizeValue }

  EntityValidator.prototype.validate = function () {
    if (!_validators.hasOwnProperty('rules')) {
      return true
    }

    const props = Object.keys(_validators.rules)
    const rules = _validators.rules
    const lang = EntityValidator.config('globalization') || defaultLang
    let message = EntityValidator.globalMsg[lang]
    let result = []
    
    if (_validators.hasOwnProperty('message')) {
      message = Object.assign({}, message, _validators.message)
    }
    
    props.forEach((prop) => {
      const methods = rules[prop]
      
      for (let method in methods) {
        if (!hasMethod(method)) {
          throw ("EntityValidator: Método " + method + " não encontrado!")
          break
        }

        let options = methods[method]

        if (!EntityValidator.fn[method](_entity[prop], options)) {

          const msgError = getMessage(message, prop, method)
          
          result.push({
            validate: false,
            type: method,
            prop: prop,
            message: msgError
          })
        }
      }
    })

    if (result.length <= 0) {
      return true
    }

    return result
  }

  const hasMethod = (methodName) => {
    const methods = EntityValidator.fn
    return methods.hasOwnProperty(methodName)
  }

  const getMessage = (message, prop, method) => {
    let msg = message[method]
    if (message.hasOwnProperty(prop) && message[prop].hasOwnProperty(method)) {
      msg = message[prop][method]
    }

    return msg
  }

  return EntityValidator
}())
