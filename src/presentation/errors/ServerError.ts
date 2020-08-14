export default class ServerError extends Error {
  constructor () {
    super('Server internal error')
    this.name = this.constructor.name
  }
}
