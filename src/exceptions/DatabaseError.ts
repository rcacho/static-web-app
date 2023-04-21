export class DatabaseError extends Error {
  originalError: string
  constructor(originalError: string, msg: string) {
    super(msg)
    this.originalError = originalError
  }
}
