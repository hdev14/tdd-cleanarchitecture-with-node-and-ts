import bcrypt from 'bcrypt'
import BCryptAdapter from './BCryptAdapter'

jest.mock('bcrypt', () => ({
  hash: async (data: any, saltOrRounds: number): Promise<string> => {
    return Promise.resolve('hashed_value')
  }
}))
describe('Unit Tests for BCryptAdapter class', () => {
  let bcryptAdapter: BCryptAdapter
  const salt = 12

  beforeEach(() => {
    bcryptAdapter = new BCryptAdapter(salt)
  })

  it('should call bcrypt.hash with correct value', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await bcryptAdapter.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const hashedValue = await bcryptAdapter.encrypt('any_value')
    expect(hashedValue).toBe('hashed_value')
  })

  it('should throw an error if brcrypt.hash throws an error', async () => {
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())
    await expect(bcryptAdapter.encrypt('any_value')).rejects.toThrow()
  })
})
