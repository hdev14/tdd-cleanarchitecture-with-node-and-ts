import { HttpRequest, HttpResponse } from '../protocols/http'

export default class SignupController {
  public handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        status_code: 400,
        body: new Error('Missing param: name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        status_code: 400,
        body: new Error('Missing param: email')
      }
    }
  }
}
