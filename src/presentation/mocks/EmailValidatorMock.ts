import IEmailValidator from '../protocols/interfaces/IEmailValidator'

export default class EmailValidator implements IEmailValidator {
  isValid (email: string): boolean {
    return true
  }
}
