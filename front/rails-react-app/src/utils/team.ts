import { Team, TeamPageProps } from 'type';
import { getUserByUserId } from 'db/user';
import { getEditors } from 'db/team';
import { getUrl, defaultCoverImage } from './';

export const createTeamPageProps = async (
  team: Team
): Promise<TeamPageProps | null> => {
  const image = await getUrl(team);

  const leader = await getUserByUserId(team.leader_id);
  const leader_image =
    leader.status === 'success' ? await getUrl(leader.data) : defaultCoverImage;

  const editors = await getEditors(team.id);
  if (leader.status === 'success' && editors.status === 'success') {
    const editors_image = Promise.all(
      editors.data.map(async (user) => {
        const image = await getUrl(user);
        return { image_url: image, name: user.name };
      })
    );
    return {
      title: team.name,
      description: team.description,
      publish_range: team.publish_range,
      image_url: image,
      leader: { image_url: leader_image, name: leader.data.name },
      authors: await editors_image,
    };
  } else {
    return null;
  }
};
