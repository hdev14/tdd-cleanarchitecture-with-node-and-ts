import validator from 'validator'
import EmailValidatorAdapter from './EmailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail: (email: string): boolean => {
    return true
  }
}))

describe('Unit Tests for EmailValidatorAdapter class', () => {
  let emailValidatorAdapter: EmailValidatorAdapter

  beforeEach(() => {
    emailValidatorAdapter = new EmailValidatorAdapter()
  })

  it('should return false if validator.isEmail return false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const emailIsValid = emailValidatorAdapter.isValid('invalid@mail.com')
    expect(emailIsValid).toBe(false)
  })

  it('should return true if validator.isEmail return true', () => {
    const emailIsValid = emailValidatorAdapter.isValid('valid@mail.com')
    expect(emailIsValid).toBe(true)
  })

  it('should call validator.isEmail with correct email', () => {
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    emailValidatorAdapter.isValid('any@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any@mail.com')
  })
})
