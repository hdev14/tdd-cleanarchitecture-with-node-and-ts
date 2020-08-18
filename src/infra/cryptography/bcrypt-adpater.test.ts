import bcrypt from 'bcrypt'
import BCryptAdapter from './BCryptAdapter'

jest.mock('bcrypt', () => ({
  hash: async (data: any, saltOrRounds: number): Promise<string> => {
    return Promise.resolve('hashed_value')
  }
}))
describe('Unit Tests for BCryptAdapter class', () => {
  it('should call bcrypt.hash with correct value', async () => {
    const salt = 12
    const bcryptAdapter = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await bcryptAdapter.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  it('should return a hash on success', async () => {
    const salt = 12
    const bcryptAdapter = new BCryptAdapter(salt)
    const hashedValue = await bcryptAdapter.encrypt('any_value')
    expect(hashedValue).toBe('hashed_value')
  })
})
