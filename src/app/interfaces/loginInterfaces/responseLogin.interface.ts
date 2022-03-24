import { userInfoInterface } from './userInfo.interface';

export interface responseLoginInterface {
  accessToken: string;
  user: userInfoInterface;
}
