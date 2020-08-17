import { AccountData, AccountModel } from '../../../domain/protocols/types/account'

export default interface IAccountRepository {
  create (accountData: AccountData): Promise<AccountModel>;
}
