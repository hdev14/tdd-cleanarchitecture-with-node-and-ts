import SignupController from './SignupController'

import MissingParamError from '../errors/MissingParamError'
import InvalidParamError from '../errors/InvalidParamError'
import ServerError from '../errors/ServerError'

import EmailValidatorMock from '../mocks/EmailValidatorMock'

jest.mock('../mocks/EmailValidatorMock')

const mockedEmailValidator = new EmailValidatorMock() as jest.Mocked<EmailValidatorMock>

const makeSignupController = () => {
  const signupController = new SignupController(mockedEmailValidator)
  return signupController
}

describe('SignUp Controller', () => {
  it('should return 400 if no name is provided', () => {
    const signupController = makeSignupController()
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
    const signupController = makeSignupController()
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
    const signupController = makeSignupController()
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

  it('should return 400 if no password_confirm is provided', () => {
    const signupController = makeSignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password_confirm'))
  })

  it('should return 400 if an invalid email is provided', () => {
    mockedEmailValidator.isValid.mockReturnValue(false)
    const signupController = makeSignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  it('should call EmailValidor.isValid with correct email', () => {
    const signupController = makeSignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    signupController.handle(httpRequest)
    expect(mockedEmailValidator.isValid).toHaveBeenCalledWith(httpRequest.body.email)
  })

  it('should return 500 if EmailValidator.isValid throws an error', () => {
    mockedEmailValidator.isValid.mockImplementationOnce(jest.fn(() => {
      throw new Error('Test error')
    }))

    const signupController = makeSignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
