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
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  it('should return 400 if no email is provided', () => {
    const signupController = new SignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        password_confirm: 'any_password'
      }
    }

    const httpResponse = signupController.handle(httpRequest)
    expect(httpResponse.status_code).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })
})
