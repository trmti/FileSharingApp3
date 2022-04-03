import { AxiosResponse } from 'axios';
import { client } from './client';
import { createFormData } from 'utils';
import { createImage } from './post';
import {
  FileWithImage,
  File,
  BuildFileParams,
  FetchSuccess,
  FetchFailed,
} from 'type';

type FetchFilesSuccess = FetchSuccess<FileWithImage[]>;
type FetchFileSuccess = FetchSuccess<File>;

export const getFilesByFolderId = (
  id: number
): Promise<FetchFilesSuccess | FetchFailed> => {
  const res = client
    .get(`/folders/get_files/${id}`)
    .then((prop: AxiosResponse<FileWithImage[]>): FetchFilesSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'ファイル一覧の取得に失敗しました' };
    });
  return res;
};

export const createFile = (
  params: BuildFileParams,
  folderId: number
): Promise<FetchFileSuccess | FetchFailed> => {
  const { file, ...otherParams } = params;
  const res = client
    .post(`/folders/create_file/${folderId}`, { ...otherParams })
    .then(async (prop: AxiosResponse<File>): Promise<
      FetchFileSuccess | FetchFailed
    > => {
      const data = prop.data;
      if (file) {
        const image = createFormData('image', file);
        const res = await createImage(data.id, image, 'file_contents');
        if (res.status === 'success') {
          return { status: 'success', data };
        } else {
          return { status: 'error', message: '画像の作成に失敗しました' };
        }
      } else {
        return { status: 'error', message: 'ファイルが選択されていません。' };
      }
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'ファイルの作成に失敗しました' };
    });
  return res;
};
