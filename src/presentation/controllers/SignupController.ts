import { HttpRequest, HttpResponse } from '../protocols/types/http'
import IController from '../protocols/interfaces/IController'
import IEmailValidator from '../protocols/interfaces/IEmailValidator'
import ICreateAccount from '../../domain/protocols/interfaces/ICreateAccount'

import MissingParamError from '../errors/MissingParamError'
import InvalidParamError from '../errors/InvalidParamError'

import { badRequest, internalError } from '../helpers/http'

export default class SignupController implements IController {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly createAccount: ICreateAccount
  ) {}

  public handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirm']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, password_confirm } = httpRequest.body

      if (password !== password_confirm) {
        return badRequest(new InvalidParamError('password_confirm'))
      }

      const emailIsValid = this.emailValidator.isValid(email)
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.createAccount.create({ name, email, password })
      return {
        status_code: 201,
        body: account
      }
    } catch (err) {
      return internalError()
    }
  }
}
