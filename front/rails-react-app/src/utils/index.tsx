import { showPost } from 'db/post';
import { User, Team, Folder } from 'type';
export const defaultCoverImage: string = 'http://localhost:8000/logo192.png';

export const getUrl = async (data: User | Team | Folder): Promise<string> => {
  if (data.post_id) {
    const image = await showPost(data.post_id);
    return image.status === 'success'
      ? image.data.image.url
      : defaultCoverImage;
  } else {
    return defaultCoverImage;
  }
};

export const createFormData = (formName: string, data: any): FormData => {
  const formData = new FormData();
  formData.append(formName, data);
  return formData;
};
