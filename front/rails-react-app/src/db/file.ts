import { getAction } from './utils';
import { FileWithImage } from 'type';

export const getFilesByFolderId = (id: number) => {
  const res = getAction<FileWithImage[]>(
    `/folders/get_files/${id}`,
    'ファイル一覧の取得に失敗しました'
  );
  return res;
};
