import SignupController from './SignupController'

import MissingParamError from '../errors/MissingParamError'
import InvalidParamError from '../errors/InvalidParamError'
import ServerError from '../errors/ServerError'

import IEmailValidator from '../protocols/interfaces/IEmailValidator'

class EmailValidatorMock implements IEmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

const emailValidatorMock = new EmailValidatorMock()

const makeSignupController = () => {
  const signupController = new SignupController(emailValidatorMock)
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

  it('should return 400 if password and password_confirn are not equal', () => {
    const signupController = makeSignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'invalid_password'
      }
    }

    const httpResponse = signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('password_confirm'))
  })

  it('should return 400 if an invalid email is provided', () => {
    jest.spyOn(emailValidatorMock, 'isValid').mockReturnValue(false)
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
    expect(emailValidatorMock.isValid).toHaveBeenCalledWith(httpRequest.body.email)
  })

  it('should return 500 if EmailValidator.isValid throws an error', () => {
    jest.spyOn(emailValidatorMock, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

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
