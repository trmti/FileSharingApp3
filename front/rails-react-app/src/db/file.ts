import { getAction } from './utils';
import { FileWithImageAndComment, FileWithImage } from 'type';

export const getFilesByFolderId = (id: number) => {
  const res = getAction<FileWithImageAndComment[]>(
    `/folders/get_files/${id}`,
    'ファイル一覧の取得に失敗しました'
  );
  return res;
};

export const showFile = (id: number) => {
  const res = getAction<FileWithImage>(
    `/file_contents/${id}`,
    'ファイルの情報を取得できませんでした。'
  );
  return res;
};
