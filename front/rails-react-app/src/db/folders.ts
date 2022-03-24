import { AxiosResponse } from 'axios';
import { client } from './client';
import { FetchSuccess, FetchFailed, Folder } from 'type';

type FetchFoldersSuccess = FetchSuccess<Folder[]>;

export const getFoldersByTeamId = (
  id: number
): Promise<FetchFoldersSuccess | FetchFailed> => {
  const res = client
    .get(`/teams/get_folders/${id}`)
    .then((prop: AxiosResponse<Folder[]>): FetchFoldersSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: 'フォルダーの取得に失敗しました' };
    });
  return res;
};
