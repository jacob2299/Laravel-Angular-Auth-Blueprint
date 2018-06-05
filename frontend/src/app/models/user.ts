import { JsonProperty, deserialize } from 'json-typescript-mapper';
import { User as IUser } from './interfaces/user.interface';

const initialState: IUser = {
  id: undefined,
  name: undefined,
  email: undefined,
  token: undefined,
  google2faEnabled: undefined,
  createdAt: undefined,
  updatedAt: undefined
};

export class User implements IUser {
  @JsonProperty('id')
  id: number;
  @JsonProperty('name')
  name: string;
  @JsonProperty('email')
  email: string;
  @JsonProperty('api_token')
  token: string;
  @JsonProperty('google2fa_enabled')
  google2faEnabled: boolean;
  @JsonProperty('created_at')
  createdAt: string;
  @JsonProperty('updated_at')
  updatedAt: string;

  constructor(init?: Partial<IUser>) {
    Object.assign(this, initialState, init);
  }

  static parse(data: any): User {
    return deserialize(User, data);
  }
}
