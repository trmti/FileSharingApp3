import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getAction, postAction } from './utils';
import { Post } from 'type';

let client: AxiosInstance;

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

export const getPostByUserId = (userId: number) => {
  const res = getAction<Post>(
    `/user/get_image/${userId}`,
    'ユーザー画像の取得に失敗しました。'
  );
  return res;
};

export const createOrUpdateImage = (
  id: number,
  image: FormData,
  master: 'teams' | 'folders' | 'file_contents',
  action: 'create' | 'update'
) => {
  const res = postAction<Post>(
    `/${master}/${action}_image/${id}`,
    image,
    'イメージが作れませんでした',
    client
  );
  return res;
};
