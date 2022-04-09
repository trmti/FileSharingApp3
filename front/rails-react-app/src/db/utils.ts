import { AxiosResponse, AxiosInstance } from 'axios';
import { FetchSuccess, FetchFailed, User, Team, Folder, File } from 'type';
import { createFormData } from 'utils';
import { createOrUpdateImage } from './post';
import { client } from './client';

type Message = { message: string };
type FetchMessageSuccess = FetchSuccess<Message>;
type FetchPostFailed = { status: 'continue'; message: string };

export const getAction = <T>(path: string, errmes: string) => {
  type Success = FetchSuccess<T>;
  const res = client
    .get(path)
    .then((props: AxiosResponse<T>): Success => {
      return { status: 'success', data: props.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: errmes };
    });
  return res;
};

export const postAction = <T>(
  path: string,
  params: {},
  errmes: string,
  mainClient: AxiosInstance = client
) => {
  type Success = FetchSuccess<T>;
  const res = mainClient
    .post(path, params)
    .then((props: AxiosResponse<T>): Success => {
      return { status: 'success', data: props.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: errmes };
    });
  return res;
};

export const deleteSome = (
  id: number,
  master: 'teams' | 'folders' | 'file_contents'
): Promise<FetchMessageSuccess | FetchFailed> => {
  const res = client
    .delete(`/${master}/${id}`)
    .then((prop: AxiosResponse<Message>): FetchMessageSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: '削除できませんでした' };
    });
  return res;
};

export const createSome = <T extends User | Team | Folder | File>(
  master: 'user' | 'teams' | 'folders',
  target: 'team' | 'folder' | 'file_content',
  params: any,
  master_id: number
): Promise<FetchFailed | FetchSuccess<T> | FetchPostFailed> => {
  const { file, ...otherParams } = params;
  const res = client
    .post<T>(`/${master}/create_${target}/${master_id}`, {
      ...otherParams,
    })
    .then((props: AxiosResponse<T>): Promise<
      FetchSuccess<T> | FetchPostFailed
    > => {
      if (!file) {
        return new Promise((resolve) =>
          resolve({ status: 'continue', message: '画像無しで作成します' })
        );
      }
      const data = props.data;
      const image = createFormData('image', file);
      const res = createOrUpdateImage(data.id, image, `${target}s`, 'create')
        .then((): FetchSuccess<T> => {
          return { status: 'success', data };
        })
        .catch((): FetchPostFailed => {
          return { status: 'continue', message: '画像の作成に失敗しました。' };
        });
      return res;
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: '作成に失敗しました。' };
    });
  return res;
};

export const updateSome = <T extends User | Team | Folder | File>(
  master: 'user' | 'teams' | 'folders' | 'file_contents',
  params: any,
  master_id: number
): Promise<FetchFailed | FetchSuccess<T> | FetchPostFailed> => {
  const { file, ...otherParams } = params;
  const res = client
    .patch<T>(`/${master}/${master_id}`, {
      ...otherParams,
    })
    .then((props: AxiosResponse<T>): Promise<
      FetchSuccess<T> | FetchPostFailed
    > => {
      if (!file) {
        throw new Error();
      }
      const data = props.data;
      const image = createFormData('image', file);
      const res = createOrUpdateImage(data.id, image, master, 'create')
        .then((): FetchSuccess<T> => {
          return { status: 'success', data };
        })
        .catch((): FetchPostFailed => {
          return { status: 'continue', message: '画像の作成に失敗しました。' };
        });
      return res;
    })
    .catch((): FetchPostFailed => {
      return { status: 'continue', message: '作成に失敗しました。' };
    });
  return res;
};
