import { JsonProperty, serialize } from 'json-typescript-mapper';

export class ForgotPasswordRequest {
  @JsonProperty('email')
  email: string;

  constructor(init?: Partial<ForgotPasswordRequest>) {
    Object.assign(this, init);
  }

  prepareRequest() {
    return serialize(this);
  }
}
