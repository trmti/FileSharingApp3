import { useCallback } from 'react';
import { getLeaderId, getEditorIds } from 'db/team';

export const defaultCoverImage: string = `${process.env.PUBLIC_URL}/logo192.png`;

export const createFormData = (formName: string, data: any): FormData => {
  const formData = new FormData();
  formData.append(formName, data);
  return formData;
};

export const isInLeader = async (teamId: number, userId: number) => {
  const res = await getLeaderId(teamId);
  if (res.status === 'success' && res.data.id === userId) {
    return true;
  } else {
    return false;
  }
};

export const isInEditor = async (teamId: number, userId: number) => {
  const res = await getEditorIds(teamId);
  if (res.status === 'success' && res.data.ids.includes(userId)) {
    return true;
  } else {
    return false;
  }
};

export const useAsyncCallback = (
  callback: (...args: any[]) => any,
  deps: any[]
) =>
  useCallback((...args) => {
    const f = async () => callback(...args);
    return f();
  }, deps);
