import AccountRepository from './AccountRepository'
import Mongo from '../Mongo'

describe('Integration test for AccountRepository class', () => {
  beforeAll(async () => {
    await Mongo.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await Mongo.disconnect()
  })

  it('should return an account on success', async () => {
    const accountRepository = new AccountRepository()
    const accountData = {
      name: 'any_name',
      email: 'any@mail.com',
      password: 'any_password'
    }
    const account = await accountRepository.create(accountData)

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(accountData.name)
    expect(account.email).toBe(accountData.email)
    expect(account.password).toBe(accountData.password)
  })
})
