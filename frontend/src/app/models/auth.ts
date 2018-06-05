import { JsonProperty, deserialize } from 'json-typescript-mapper';
import { Auth as IAuth } from './interfaces/auth.interface';
import { User } from './user';
import { LoginResponse } from './responses/login.response';

const initialState: IAuth = {
  apiToken: undefined,
  user: undefined,
};

export class Auth implements IAuth {
  @JsonProperty('token')
  apiToken: string;
  @JsonProperty({ clazz: User, name: 'user' })
  user: User;

  constructor(init?: Partial<IAuth>) {
    Object.assign(this, initialState, init);
  }

  static parse(data: LoginResponse): Auth {
    return deserialize(Auth, data);
  }
}
