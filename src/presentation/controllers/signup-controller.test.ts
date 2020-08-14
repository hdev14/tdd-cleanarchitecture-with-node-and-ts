import SignupController from './SignupController'
import MissingParamError from '../errors/MissingParamError'

describe('SignUp Controller', () => {
  it('should return 400 if no name is provided', () => {
    const signupController = new SignupController()
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('should return 400 if no email is provided', () => {
    const signupController = new SignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  it('should return 400 if no password is provided', () => {
    const signupController = new SignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})
