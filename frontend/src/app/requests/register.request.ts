import { JsonProperty, serialize } from 'json-typescript-mapper';
import { LoginRequest } from './login.request';

export class RegisterRequest {
  @JsonProperty('name')
  name: string;
  @JsonProperty('email')
  email: string;
  @JsonProperty('password')
  password: string;
  @JsonProperty('password_confirmation')
  passwordConfirmation: string;

  constructor(init?: Partial<LoginRequest>) {
    Object.assign(this, init);
  }

  prepareRequest() {
    return serialize(this);
  }
}
