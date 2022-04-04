import { getAction } from './utils';
import { Folder, FolderWithImage } from 'type';

export const showFolder = (folderId: number) => {
  const res = getAction<Folder>(
    `/folders/${folderId}`,
    'フォルダーの作成に失敗しました'
  );
  return res;
};

export const getFoldersByTeamId = (id: number) => {
  const res = getAction<FolderWithImage[]>(
    `/teams/get_folders/${id}`,
    'フォルダーの取得に失敗しました'
  );
  return res;
};
