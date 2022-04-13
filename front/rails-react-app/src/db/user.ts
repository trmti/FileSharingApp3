import { getAction } from './utils';
import { User } from 'type';

export const getUserByUserId = (userId: number) => {
  const res = getAction<User>(
    `/user/${userId}`,
    'ユーザーの取得に失敗しました'
  );
  return res;
};
