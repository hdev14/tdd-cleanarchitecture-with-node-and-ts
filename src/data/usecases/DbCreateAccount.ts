import { AccountData, AccountModel } from '../../domain/protocols/types/account'
import IEncrypter from '../protocols/interfaces/IEncrypter'

export default class DbCreateAccount {
  constructor (private readonly encrypter: IEncrypter) {}

  async create (accountData: AccountData): Promise<AccountModel> {
    this.encrypter.encrypt(accountData.password)
    return Promise.resolve(null)
  }
}
