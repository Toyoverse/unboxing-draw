export class NoToyosError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, NoToyosError.prototype);
  }
}
