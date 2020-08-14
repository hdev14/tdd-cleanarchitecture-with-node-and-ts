import { HttpRequest, HttpResponse } from '../protocols/http'
import MissingParamError from '../errors/MissingParamError'
import { badRequest } from '../helpers/http'

export default class SignupController {
  public handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
