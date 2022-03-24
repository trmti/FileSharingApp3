export const defaultCoverImage: string = 'http://localhost:8000/logo192.png';

export const createFormData = (formName: string, data: any): FormData => {
  const formData = new FormData();
  formData.append(formName, data);
  return formData;
};
