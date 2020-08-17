import ICreateAccount from '../../domain/protocols/interfaces/ICreateAccount'
import { AccountData, AccountModel } from '../../domain/protocols/types/account'
import IEncrypter from '../protocols/interfaces/IEncrypter'
import IAccountRepository from '../protocols/interfaces/IAccountRepository'

export default class DbCreateAccount implements ICreateAccount {
  constructor (
    private readonly encrypter: IEncrypter,
    private readonly accountRepository: IAccountRepository
  ) {}

  async create (accountData: AccountData): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.accountRepository.create({
      ...accountData,
      password: hashedPassword
    })
    return null
  }
}
