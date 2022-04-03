import { AxiosResponse } from 'axios';
import { FetchSuccess, FetchFailed } from 'type';
import { client } from './client';

type Message = { message: string };
type FetchMessageSuccess = FetchSuccess<Message>;

export const deleteSome = (
  id: number,
  master: 'teams' | 'folders' | 'file_contents'
): Promise<FetchMessageSuccess | FetchFailed> => {
  const res = client
    .delete(`/${master}/${id}`)
    .then((prop: AxiosResponse<Message>): FetchMessageSuccess => {
      return { status: 'success', data: prop.data };
    })
    .catch((): FetchFailed => {
      return { status: 'error', message: '削除できませんでした' };
    });
  return res;
};
