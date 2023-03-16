export class CategoryAlreadyExistsError extends Error {
  constructor(msg: string) {
    super(msg)
  }
}
