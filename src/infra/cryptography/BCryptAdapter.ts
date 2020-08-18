import bcrypt from 'bcrypt'
import IEncrypter from '../../data/protocols/interfaces/IEncrypter'

export default class BCryptAdapter implements IEncrypter {
  constructor (private readonly salt = 12) {}

  async encrypt (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }
}
