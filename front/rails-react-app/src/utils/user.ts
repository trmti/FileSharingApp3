import { getUserByUserId } from 'db/user';
import { getUrl, defaultCoverImage } from './';
import { FetchSuccess, TeamApiJson, TeamWithImage } from 'type';

type FetchTeamApiJsonSuccess = FetchSuccess<TeamApiJson>;

export const createTeamCard = async (
  team: FetchTeamApiJsonSuccess
): Promise<TeamWithImage[]> => {
  const teams = Promise.all(
    team.data.teams.map(async (team) => {
      const leader = await getUserByUserId(team.leader_id);
      const leader_image =
        leader.status === 'success'
          ? await getUrl(leader.data)
          : defaultCoverImage;
      const cover_image = await getUrl(team);
      return { ...team, cover_image, leader_image };
    })
  );
  return teams;
};
