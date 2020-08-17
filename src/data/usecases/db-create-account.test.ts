import DbCreateAccount from './DbCreateAccount'
import IEncrypter from '../protocols/interfaces/IEncrypter'

class EncrypterMock implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    return Promise.resolve('hashed')
  }
}

describe('Unit Tests for DbCreateAccount class', () => {
  let dbCreateAccount: DbCreateAccount
  let encrypterMock: EncrypterMock

  beforeEach(() => {
    encrypterMock = new EncrypterMock()
    dbCreateAccount = new DbCreateAccount(encrypterMock)
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
})
