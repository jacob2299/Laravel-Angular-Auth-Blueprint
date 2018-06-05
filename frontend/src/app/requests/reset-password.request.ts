import { JsonProperty, serialize } from 'json-typescript-mapper';

export class ResetPasswordRequest {
  @JsonProperty('token')
  token: string;
  @JsonProperty('email')
  email: string;
  @JsonProperty('password')
  password: string;
  @JsonProperty('password_confirmation')
  passwordConfirmation: string;

  constructor(init?: Partial<ResetPasswordRequest>) {
    Object.assign(this, init);
  }

  prepareRequest() {
    return serialize(this);
  }
}

