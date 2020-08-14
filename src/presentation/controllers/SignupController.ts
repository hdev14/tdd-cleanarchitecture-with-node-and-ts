import { HttpRequest, HttpResponse } from '../protocols/types/http'
import IController from '../protocols/interfaces/IController'
import IEmailValidator from '../protocols/interfaces/IEmailValidator'
import MissingParamError from '../errors/MissingParamError'
import InvalidParamError from '../errors/InvalidParamError'
import ServerError from '../errors/ServerError'
import { badRequest, internalError } from '../helpers/http'

export default class SignupController implements IController {
  constructor (private readonly emailValidator: IEmailValidator) {}

  public handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirm']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (err) {
      return internalError()
    }
  }
}
