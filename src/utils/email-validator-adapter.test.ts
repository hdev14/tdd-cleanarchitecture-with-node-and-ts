import validator from 'validator'
import EmailValidatorAdapter from './EmailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail: (email: string): boolean => {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  it('should return false if validator.isEmail return false', () => {
    const emailValidatorAdapter = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const emailIsValid = emailValidatorAdapter.isValid('invalid@mail.com')
    expect(emailIsValid).toBe(false)
  })

  it('should return true if validator.isEmail return true', () => {
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const emailIsValid = emailValidatorAdapter.isValid('valid@mail.com')
    expect(emailIsValid).toBe(true)
  })
})
