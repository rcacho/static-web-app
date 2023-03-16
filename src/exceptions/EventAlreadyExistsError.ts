export class EventAlreadyExistsError extends Error {
  constructor(msg: string) {
    super(msg)
  }
}
