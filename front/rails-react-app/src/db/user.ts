import axios, { AxiosRequestConfig } from 'axios';

const url = process.env.REACT_APP_API_HOST;

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${url}/api/v1/auth/sign_in`, {
      username: username,
      password: password,
    });
    return res;
  } catch {}
};
