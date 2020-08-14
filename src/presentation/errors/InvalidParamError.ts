export default class InvalidParamError extends Error {
  constructor (param: string) {
    super(`Invalid param: ${param}`)
  }
}
