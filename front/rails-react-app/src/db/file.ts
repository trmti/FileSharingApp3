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

export const createFile = async (
  params: BuildFileParams,
  folderId: number
): Promise<FetchFileSuccess | FetchFailed> => {
  const { file, ...otherParams } = params;
  const res = client
    .post(`/folders/create_file/${folderId}`, { ...otherParams })
    .then((props: AxiosResponse<File>): Promise<
      FetchSuccess<File> | FetchFailed
    > => {
      const data = props.data;
      if (!file) {
        throw new Error();
      }
      const image = createFormData('image', file);
      const res = createOrUpdateImage(data.id, image, 'file_contents', 'create')
        .then((): FetchSuccess<File> => {
          return { status: 'success', data };
        })
        .catch((): FetchFailed => {
          return { status: 'error', message: '画像の作成に失敗しました。' };
        });
      return res;
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: '画像を選択してください。' };
    });
  return res;
};
