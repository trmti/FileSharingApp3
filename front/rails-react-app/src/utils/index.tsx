import { getLeaderId, getEditorIds } from 'db/team';

export const defaultCoverImage: string = `${process.env.PUBLIC_URL}/logo192.png`;

export const createFormData = (formName: string, data: any): FormData => {
  const formData = new FormData();
  formData.append(formName, data);
  return formData;
};

export const setInLeader = async (
  setIsLeader: React.Dispatch<React.SetStateAction<boolean>>,
  teamId: number,
  userId: number
) => {
  const res = await getLeaderId(teamId);
  if (res.status === 'success' && res.data.id === userId) {
    setIsLeader(true);
  } else {
    setIsLeader(false);
  }
};

export const setInEditor = async (
  setIsEditor: React.Dispatch<React.SetStateAction<boolean>>,
  teamId: number,
  userId: number
) => {
  const res = await getEditorIds(teamId);
  if (res.status === 'success' && res.data.ids.includes(userId)) {
    setIsEditor(true);
  } else {
    setIsEditor(false);
  }
};
