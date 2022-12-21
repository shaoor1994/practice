import { HttpError, HttpResponse } from "./HttpError";
import { ValidationError } from "class-validator";
export class BadRequestError extends HttpError {
  name = "BadRequestError";

  constructor(message?: string, errors?: ValidationError[]) {
    super(400);
    Object.setPrototypeOf(this, BadRequestError.prototype);

    if (errors) {
      this.response = new HttpResponse();
      this.response.errors = errors;
    }
    if (message) { this.message = message; }
  }
}
