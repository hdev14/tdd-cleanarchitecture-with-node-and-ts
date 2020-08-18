import bcrypt from 'bcrypt'
import BCryptAdapter from './BCryptAdapter'

describe('Unit Tests for BCryptAdapter class', () => {
  it('should call bcrypt.hash with correct value', async () => {
    const salt = 12
    const bcryptAdapter = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await bcryptAdapter.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })
})
