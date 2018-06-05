import { JsonProperty, serialize } from 'json-typescript-mapper';

export class LoginRequest {
  @JsonProperty('email')
  email: string;
  @JsonProperty('password')
  password: string;

  constructor(init?: Partial<LoginRequest>) {
    Object.assign(this, init);
  }

  prepareRequest() {
    return serialize(this);
  }
}
