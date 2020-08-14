import { HttpRequest, HttpResponse } from '../protocols/types/http'
import Controller from '../protocols/interfaces/Controller'
import MissingParamError from '../errors/MissingParamError'
import { badRequest } from '../helpers/http'

export default class SignupController implements Controller {
  public handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'password_confirm']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
