import { ForgotPassword as IForgotPassword } from './interfaces/forgot-password.interface';
import { JsonProperty, deserialize } from 'json-typescript-mapper';
import { ForgotPasswordResponse } from './responses/forgot-password.response';

const initialState: IForgotPassword = {
  success: undefined,
  message: undefined
};

export class ForgotPassword {
  @JsonProperty('success')
  success: boolean;
  @JsonProperty('message')
  message: string;

  constructor(init?: Partial<IForgotPassword>) {
    Object.assign(this, initialState, init);
  }

  static parse(data: ForgotPasswordResponse): ForgotPassword {
    return deserialize(ForgotPassword, data);
  }
}

