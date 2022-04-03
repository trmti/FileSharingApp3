import { AxiosResponse } from 'axios';
import { createFormData } from 'utils';
import { createImage } from './post';
import { client } from './client';
import {
  FetchSuccess,
  Folder,
  BuildFolderParams,
  FetchFailed,
  FolderWithImage,
} from 'type';

type FetchFoldersSuccess = FetchSuccess<FolderWithImage[]>;
type FetchFolderSuccess = FetchSuccess<Folder>;
type FetchPostFailed = { status: 'continue'; message: string };

export const showFolder = (
  folderId: number
): Promise<FetchFolderSuccess | FetchFailed> => {
  const res = client
    .get(`/folders/${folderId}`)
    .then((prop: AxiosResponse<Folder>): FetchFolderSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'フォルダーの作成に失敗しました' };
    });
  return res;
};

export const getFoldersByTeamId = (
  id: number
): Promise<FetchFoldersSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/get_folders/${id}`)
    .then((prop: AxiosResponse<FolderWithImage[]>): FetchFoldersSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'フォルダーの取得に失敗しました' };
    });
  return res;
};

export const createFolder = (
  params: BuildFolderParams,
  team_id: number
): Promise<FetchFolderSuccess | FetchPostFailed | FetchFailed> => {
  const { file, ...otherParams } = params;
  const res = client
    .post(`/teams/create_folder/${team_id}`, { ...otherParams })
    .then(async (prop: AxiosResponse<Folder>): Promise<
      FetchFolderSuccess | FetchPostFailed
    > => {
      const data = prop.data;
      if (file) {
        const image = createFormData('image', file);
        const res = await createImage(data.id, image, 'folders');
        if (res.status === 'success') {
          return { status: 'success', data };
        } else {
          return { status: 'continue', message: '画像の作成に失敗しました' };
        }
      } else {
        return {
          status: 'continue',
          message: 'ファイルが選択されていません。',
        };
      }
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'フォルダーの作成に失敗しました' };
    });
  return res;
};
