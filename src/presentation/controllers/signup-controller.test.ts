import SignupController from './SignupController'

import MissingParamError from '../errors/MissingParamError'
import InvalidParamError from '../errors/InvalidParamError'
import ServerError from '../errors/ServerError'

import IEmailValidator from '../protocols/interfaces/IEmailValidator'
import ICreateAccount from '../../domain/protocols/interfaces/ICreateAccount'

import { AccountData, AccountModel } from '../../domain/protocols/types/account'

class EmailValidatorMock implements IEmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

class CreateAccountMock implements ICreateAccount {
  async create (account: AccountData): Promise<AccountModel> {
    return Promise.resolve({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    })
  }
}

describe('Unit Tests for SignUpController class', () => {
  let signupController: SignupController
  let emailValidatorMock: EmailValidatorMock
  let createAccountMock: CreateAccountMock

  beforeEach(() => {
    emailValidatorMock = new EmailValidatorMock()
    createAccountMock = new CreateAccountMock()
    signupController = new SignupController(emailValidatorMock, createAccountMock)
  })

  it('should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = await signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('should return 400 if no email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = await signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  it('should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = await signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  it('should return 400 if no password_confirm is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password_confirm'))
  })

  it('should return 400 if password and password_confirn are not equal', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'invalid_password'
      }
    }

    const httpResponse = await signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('password_confirm'))
  })

  it('should return 400 if an invalid email is provided', async () => {
    jest.spyOn(emailValidatorMock, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = await signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  it('should call EmailValidor.isValid with correct email', async () => {
    const isValidSpy = jest.spyOn(emailValidatorMock, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    await signupController.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  it('should return 500 if EmailValidator.isValid throws an error', async () => {
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

    const httpResponse = await signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('should call CreateAccount.create with correct data', async () => {
    const createSpy = jest.spyOn(createAccountMock, 'create')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }
    await signupController.handle(httpRequest)
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any@mail.com',
      password: 'any_password'
    })
  })

  it('should return 500 if CreateAccount.create throws an error', async () => {
    jest.spyOn(createAccountMock, 'create').mockRejectedValueOnce(new Error())

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }
    const httpResponse = await signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('should return 201 if valid data if provided', async () => {
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid@mail.com',
        password: 'valid_password',
        password_confirm: 'valid_password'
      }
    }
    const httpResponse = await signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    })
  })
})
