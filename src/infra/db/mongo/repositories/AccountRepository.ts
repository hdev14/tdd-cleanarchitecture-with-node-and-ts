import Mongo from '../Mongo'
import IAccountRepository from '../../../../data/protocols/interfaces/IAccountRepository'
import { AccountData, AccountModel } from '../../../../domain/protocols/types/account'

export default class AccountRepository implements IAccountRepository {
  async create (accountData: AccountData): Promise<AccountModel> {
    const accountCollection = Mongo.getCollection('accounts')
    const { _id: id, ...rest } = (await accountCollection.insertOne(accountData)).ops[0]
    return { id, ...rest }
  }
}
