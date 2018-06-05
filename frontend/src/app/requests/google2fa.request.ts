import { JsonProperty, serialize } from 'json-typescript-mapper';

export class Google2faRequest {
  @JsonProperty('code')
  code: string;

  constructor(init?: Partial<Google2faRequest>) {
    Object.assign(this, init);
  }

  prepareRequest() {
    return serialize(this);
  }
}
