import EmailValidatorAdapter from './EmailValidatorAdapter'

describe('EmailValidator Adapter', () => {
  it('should return false if EmailValidatorAdapter.isValid return false', () => {
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const emailIsValid = emailValidatorAdapter.isValid('invalid@mail.com')
    expect(emailIsValid).toBe(false)
  })
})
