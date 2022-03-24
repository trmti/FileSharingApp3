import { AxiosResponse } from 'axios';
import { client } from './client';
import { File, FetchSuccess, FetchFailed } from 'type';

type FetchFilesSuccess = FetchSuccess<File[]>;

export const getFilesByFolderId = (
  id: number
): Promise<FetchFilesSuccess | FetchFailed> => {
  const res = client
    .get(`/folders/get_files/${id}`)
    .then((prop: AxiosResponse<File[]>): FetchFilesSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'ファイル一覧の取得に失敗しました' };
    });
  return res;
};
