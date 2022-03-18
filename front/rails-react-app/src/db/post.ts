import axios, { AxiosInstance, AxiosResponse, AxiosPromise } from 'axios';
import { PostApiJson, Post, FetchFailed, FetchSuccess } from 'type';

let client: AxiosInstance;

type FetchPostSuccess = FetchSuccess<Post>;

client = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

client.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  const data = response.data;
  return { ...response.data, data };
});

export const getPosts = (): AxiosPromise<PostApiJson> => {
  return client.get('/posts');
};

export const showPosts = (id: number): AxiosPromise<Post> => {
  return client.get(`/posts/${id}`);
};

export const createPost = (data: FormData): AxiosPromise => {
  return client.post('/posts', data);
};

export const deletePost = (id: string): AxiosPromise => {
  return client.delete(`/posts/${id}`);
};

export const getPostByUserId = (
  userId: number
): Promise<FetchPostSuccess | FetchFailed> => {
  const res = client
    .get(`/user/get_image/${userId}`)
    .then((prop: AxiosResponse<Post>): FetchPostSuccess => {
      const post = prop.data.post;
      return { status: 'success', data: { post } };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'ユーザー画像の取得に失敗しました。' };
    });

  return res;
};

export const createUserImage = (
  userId: number,
  data: FormData
): AxiosPromise<Post> => {
  return client.post(`/user/get_image/${userId}`, data);
};

export const updateUserImage = (
  userId: number,
  data: FormData
): AxiosPromise<Post> => {
  return client.post(`/user/get_image/${userId}`, data);
};
