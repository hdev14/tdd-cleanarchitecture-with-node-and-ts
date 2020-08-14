import SignupController from './SignupController'

describe('SignUp Controller', () => {
  it('should return 400 if no name is provided', () => {
    const signupController = new SignupController()
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
  })
})
