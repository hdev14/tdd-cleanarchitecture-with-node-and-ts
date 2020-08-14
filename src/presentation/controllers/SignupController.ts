import { HttpRequest, HttpResponse } from '../protocols/http'
import MissingParamError from '../errors/MissingParamError'

export default class SignupController {
  public handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        status_code: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        status_code: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
