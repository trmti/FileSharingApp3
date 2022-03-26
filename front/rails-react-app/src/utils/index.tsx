export const defaultCoverImage: string = `${process.env.PUBLIC_URL}/logo192.png`;

export const createFormData = (formName: string, data: any): FormData => {
  const formData = new FormData();
  formData.append(formName, data);
  return formData;
};
