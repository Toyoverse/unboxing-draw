export class InvalidBoxTypeError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, InvalidBoxTypeError.prototype);
  }
}
