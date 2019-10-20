import {BaseResponse} from '@/types/Requests/ResponseTemplate';

export interface LoginRes extends BaseResponse {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
  refresh_token: string;
}
export interface ForgetPasswordRes extends BaseResponse {

}

