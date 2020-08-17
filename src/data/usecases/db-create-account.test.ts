import DbCreateAccount from './DbCreateAccount'
import IEncrypter from '../protocols/interfaces/IEncrypter'
import IAccountRepository from '../protocols/interfaces/IAccountRepository'
import { AccountData, AccountModel } from '../../domain/protocols/types/account'

class EncrypterMock implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    return Promise.resolve('hashed')
  }
}

class AccountRepositoryMock implements IAccountRepository {
  async create (accountData: AccountData): Promise<AccountModel> {
    return {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'hashed'
    }
  }
}

describe('Unit Tests for DbCreateAccount class', () => {
  let dbCreateAccount: DbCreateAccount
  let encrypterMock: EncrypterMock
  let accountRepositoryMock: AccountRepositoryMock

  beforeEach(() => {
    encrypterMock = new EncrypterMock()
    accountRepositoryMock = new AccountRepositoryMock()
    dbCreateAccount = new DbCreateAccount(encrypterMock, accountRepositoryMock)
  })

  it('should call Encrypter.encrypt with correct value', async () => {
    const encryptSpy = jest.spyOn(encrypterMock, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }
    await dbCreateAccount.create(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })

  it('should throw an error if Encrypter.encrypt throws an error', async () => {
    jest.spyOn(encrypterMock, 'encrypt').mockRejectedValueOnce(new Error())
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    await expect(dbCreateAccount.create(accountData)).rejects.toThrow()
  })

  it('should call AccountRepository.create with correct data', async () => {
    const createSpy = jest.spyOn(accountRepositoryMock, 'create')
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    await dbCreateAccount.create(accountData)
    expect(createSpy).toHaveBeenCalledWith({
      ...accountData,
      password: 'hashed'
    })
  })

  it('should throw an error if AccountRepository.create throws an error', async () => {
    jest.spyOn(accountRepositoryMock, 'create').mockRejectedValueOnce(new Error())
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    await expect(dbCreateAccount.create(accountData)).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }
    const account = await dbCreateAccount.create(accountData)
    expect(account).toEqual({
      id: 'valid_id',
      ...accountData,
      password: 'hashed'
    })
  })
})
