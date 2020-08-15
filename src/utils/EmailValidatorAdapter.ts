import IEmailValidator from '../presentation/protocols/interfaces/IEmailValidator'

export default class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
