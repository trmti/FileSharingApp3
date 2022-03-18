import { FC, useState, useEffect } from 'react';
import { useAuthUser } from 'auth/AuthUserContext';
import { getTeamsRecord } from 'db/team';
import { showPosts, getPostByUserId } from 'db/post';
import { getTeamsByUserId } from 'db/user';
import { TeamWithImage } from 'type';
import HomeTemp from 'components/templates/Home';

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

const Home: FC = () => {
  const [recentlyTeams, setrecentlyTeams] =
    useState<TeamWithImage[] | null>(null);
  const user = useAuthUser();
  const [joinTeams, setJoinTeams] = useState<TeamWithImage[] | null>(null);

  const onClickJoinTeams = (id: number) => {
    console.log(id);
  };

  const onClickRecentlyTeams = (id: number) => {
    console.log(id);
  };

  // ユーザーが参加しているチームの取得
  useEffect(() => {
    if (user) {
      (async () => {
        const team = await getTeamsByUserId(user.id);
        if (team.status === 'success') {
          const teams: TeamWithImage[] = await Promise.all(
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
          setJoinTeams(teams);
        }
      })();
    }
  }, []);

  // 最近追加されたチームの取得
  useEffect(() => {
    (async () => {
      const team = await getTeamsRecord(10, 0);
      if (team.status === 'success') {
        const teams: TeamWithImage[] = await Promise.all(
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
        setrecentlyTeams(teams);
      }
    })();
  }, []);

  return (
    <HomeTemp
      joinTeams={joinTeams}
      recentlyTeams={recentlyTeams}
      onClickJoinTeams={onClickJoinTeams}
      onClickRecentlyTeams={onClickRecentlyTeams}
    />
  );
};

export default Home;
