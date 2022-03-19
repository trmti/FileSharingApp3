import { showPosts, getPostByUserId } from 'db/post';
import { FetchSuccess, TeamApiJson } from 'type';

type FetchTeamApiJsonSuccess = FetchSuccess<TeamApiJson>;

const defaultCoverImage = {
  data: {
    post: {
      image: { url: 'http://localhost:8000/logo192.png' },
    },
  },
};

const defaultUserImage = {
  data: {
    post: {
      image: { url: 'http://localhost:8000/logo192.png' },
    },
  },
};

export const makeCardData = async (team: FetchTeamApiJsonSuccess) => {
  const teams = Promise.all(
    team.data.teams.map(async (team) => {
      const cover_post = team.post_id
        ? await showPosts(team.post_id)
        : defaultCoverImage;
      const leader_post = await getPostByUserId(team.leader_id);
      const leader_image =
        leader_post.status === 'success'
          ? leader_post.data.post.image.url
          : defaultUserImage.data.post.image.url;
      const cover_image = cover_post.data.post.image.url;
      return { ...team, cover_image, leader_image };
    })
  );
  return teams;
};
