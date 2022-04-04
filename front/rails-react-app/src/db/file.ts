import { AxiosResponse } from 'axios';
import { getAction } from './utils';
import { createOrUpdateImage } from './post';
import { client } from './client';
import { createFormData } from 'utils';
import {
  FileWithImage,
  File,
  BuildFileParams,
  FetchSuccess,
  FetchFailed,
} from 'type';

type FetchFileSuccess = FetchSuccess<File>;

export const getFilesByFolderId = (id: number) => {
  const res = getAction<FileWithImage[]>(
    `/folders/get_files/${id}`,
    'ファイル一覧の取得に失敗しました'
  );
  return res;
};
