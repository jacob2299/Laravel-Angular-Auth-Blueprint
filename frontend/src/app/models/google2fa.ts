import { JsonProperty, deserialize } from 'json-typescript-mapper';

import { Google2fa as IGoogle2fa } from './interfaces/google2fa.interface';
import { Google2faQrResponse } from './responses/google2fa-qr.response';

const initialState = {
  qrImage: undefined,
  secret: undefined
};

export class Google2fa {
  @JsonProperty('QR_Image')
  qrImage: string;
  @JsonProperty('secret')
  secret: string;

  constructor(init?: Partial<IGoogle2fa>) {
    Object.assign(this, initialState, init);
  }

  static parse(data: Google2faQrResponse): Google2fa {
    return deserialize(Google2fa, data);
  }
}
