import { HttpResponse } from '../protocols/types/http'

export const badRequest = (error: Error): HttpResponse => ({
  status_code: 400,
  body: error
})
