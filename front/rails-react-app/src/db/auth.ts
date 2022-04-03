import axios, { AxiosResponse } from 'axios';
import {
  SignUpParams,
  SignInParams,
  User,
  FetchSuccess,
  FetchFailed,
} from 'type';
import Cookies from 'js-cookie';

type FetchUserSuccess = FetchSuccess<User>;
type LogOutSuccess = {
  success: true;
};

type UserData = {
  data: User;
};

const api_url = `${process.env.REACT_APP_API_HOST}/api/v1`;

export const loginUser = (params: SignInParams) => {
  console.log('login');
  const res = axios
    .post(`${api_url}/auth/sign_in`, params, { withCredentials: true })
    .then((prop: AxiosResponse<UserData>): FetchUserSuccess => {
      const data = prop.data.data;
      const headers = prop.headers;
      Cookies.set('_access_token', headers['access-token']);
      Cookies.set('_client', headers.client);
      Cookies.set('_uid', headers.uid);
      return { status: 'success', data };
    })
    .catch((): FetchFailed => {
      return {
        status: 'error',
        message: 'ログインに失敗しました。',
      };
    });
  return res;
};

export const signUpUser = (params: SignUpParams) => {
  const res = axios
    .post(`${api_url}/auth`, params, { withCredentials: true })
    .then((prop: AxiosResponse<UserData>): FetchUserSuccess => {
      const data = prop.data.data;
      return { status: 'success', data };
    })
    .catch((): FetchFailed => {
      return {
        status: 'error',
        message: 'アカウント登録に失敗しました',
      };
    });
  return res;
};

export const logOutUser = () => {
  const res = axios
    .delete(`${api_url}/auth/sign_out`, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((prop: AxiosResponse<LogOutSuccess>): boolean => {
      Cookies.remove('_access_token');
      Cookies.remove('_client');
      Cookies.remove('_uid');
      const data = prop.data.success;
      return data;
    })
    .catch((): boolean => {
      return false;
    });
  return res;
};

export const getCurrentUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) {
    const res: FetchFailed = {
      status: 'error',
      message: 'ユーザーの取得に失敗しました',
    };
    return res;
  }
  const res = axios
    .get(`${api_url}/auth/sessions`, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((prop: AxiosResponse) => {
      if (prop.data.is_login) {
        const res: FetchUserSuccess = {
          status: 'success',
          data: prop.data.data,
        };
        return res;
      } else {
        const res: FetchFailed = {
          status: 'error',
          message: 'ユーザーが存在しません',
        };
        return res;
      }
    })
    .catch((): FetchFailed => {
      const res: FetchFailed = {
        status: 'error',
        message: 'ユーザーの取得に失敗しました',
      };
      return res;
    });
  return res;
};
