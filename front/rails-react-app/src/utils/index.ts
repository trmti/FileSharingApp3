import { showPost, getPostByUserId } from 'db/post';
import { FetchSuccess, TeamApiJson, TeamWithImage } from 'type';

type FetchTeamApiJsonSuccess = FetchSuccess<TeamApiJson>;

const defaultCoverImage = {
  status: 'error',
  data: {
    image: { url: 'http://localhost:8000/logo192.png' },
  },
};

const defaultUserImage = {
  status: 'error',
  data: {
    image: { url: 'http://localhost:8000/logo192.png' },
  },
};

export const makeCardData = async (
  team: FetchTeamApiJsonSuccess
): Promise<TeamWithImage[]> => {
  const teams = Promise.all(
    team.data.teams.map(async (team) => {
      const leader_post = await getPostByUserId(team.leader_id);
      const cover_post = team.post_id
        ? await showPost(team.post_id)
        : defaultCoverImage;
      const cover_image =
        cover_post.status === 'success'
          ? cover_post.data.image.url
          : defaultUserImage.data.image.url;
      const leader_image =
        leader_post.status === 'success'
          ? leader_post.data.image.url
          : defaultUserImage.data.image.url;
      return { ...team, cover_image, leader_image };
    })
  );
  return teams;
};

export const createFormData = (formName: string, data: any): FormData => {
  const formData = new FormData();
  formData.append(formName, data);
  return formData;
};
