import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { fileClient } from './client';
import { Post, FetchFailed, FetchSuccess } from 'type';

let client: AxiosInstance;

type FetchPostSuccess = FetchSuccess<Post>;

client = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}/api/v1`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

client.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  const data = response.data;
  return { ...response.data, data };
});

export const getPostByUserId = (
  userId: number
): Promise<FetchPostSuccess | FetchFailed> => {
  const res = client
    .get(`/user/get_image/${userId}`)
    .then((prop: AxiosResponse<Post>): FetchPostSuccess => {
      const data = prop.data;
      return { status: 'success', data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'ユーザー画像の取得に失敗しました。' };
    });

  return res;
};

export const createImage = (
  id: number,
  image: FormData,
  master: 'teams' | 'folders' | 'file_contents'
) => {
  const res = fileClient
    .post(`/${master}/create_image/${id}`, image)
    .then((prop) => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'イメージが作れませんでした' };
    });
  return res;
};
