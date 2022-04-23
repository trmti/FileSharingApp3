import { getAction, postAction } from './utils';
import { CommentWithImage } from 'type';

export const getComments = (fileId: number) => {
  const res = getAction<CommentWithImage[]>(
    `/file_contents/get_comments/${fileId}`,
    'コメント一覧の取得に失敗しました。'
  );
  return res;
};

export const createComment = (text: string, userId: number, fileId: number) => {
  const res = postAction<null>(
    `/file_contents/create_comment/${fileId}`,
    { text: text, user_id: userId },
    'コメントが作成されませんでした。'
  );
  return res;
};
