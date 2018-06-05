import { JsonProperty, serialize } from 'json-typescript-mapper';
import { ParamsInheritanceStrategy } from '@angular/router/src/router_state';

export class EmailVerificationRequest {
  @JsonProperty('email')
  email: string;
  @JsonProperty('token')
  token: string;

  constructor(init?: Partial<EmailVerificationRequest>) {
    Object.assign(this, init);
  }

  prepareRequest() {
    return serialize(this);
  }
}
