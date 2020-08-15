import { AccountData, AccountModel } from '../types/account'

export default interface ICreateAccount {
  create (account: AccountData): AccountModel
}
