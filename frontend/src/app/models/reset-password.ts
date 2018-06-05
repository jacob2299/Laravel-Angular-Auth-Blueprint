import { User } from './user';
import { ResetPassword as IResetPassword } from './interfaces/reset-password.interface';

import { JsonProperty, deserialize } from 'json-typescript-mapper';
import { ResetPasswordResponse } from './responses/reset-password.response';

const initialState = {
  success: undefined,
  message: undefined,
  apiToken: undefined,
  user: new User()
};

export class ResetPassword {
  @JsonProperty('success')
  success: boolean;
  @JsonProperty('message')
  message: string;
  @JsonProperty('token')
  apiToken: string;
  @JsonProperty({ clazz: User, name: 'user' })
  user: User;

  constructor(init?: Partial<IResetPassword>) {
    Object.assign(this, initialState, init);
  }

  static parse(data: ResetPasswordResponse): ResetPassword {
    return deserialize(ResetPassword, data);
  }
}
