import { HttpResponse } from '../protocols/types/http'
import ServerError from '../errors/ServerError'

export const badRequest = (error: Error): HttpResponse => ({
  status_code: 400,
  body: error
})

export const internalError = (): HttpResponse => ({
  status_code: 500,
  body: new ServerError()
})

export const created = (data: any): HttpResponse => ({
  status_code: 201,
  body: data
})
