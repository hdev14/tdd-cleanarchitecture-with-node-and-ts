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

describe('SignUp Controller', () => {
  let signupController: SignupController
  let emailValidatorMock: EmailValidatorMock

  beforeEach(() => {
    emailValidatorMock = new EmailValidatorMock()
    signupController = new SignupController(emailValidatorMock)
  })

  it('should return 400 if no name is provided', () => {
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
    jest.spyOn(emailValidatorMock, 'isValid').mockReturnValueOnce(false)

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
    const isValidSpy = jest.spyOn(emailValidatorMock, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    signupController.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  it('should return 500 if EmailValidator.isValid throws an error', () => {
    jest.spyOn(emailValidatorMock, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

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
