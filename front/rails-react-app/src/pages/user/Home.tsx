import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeTemp from 'components/templates/Home';

const Home: FC = () => {
  const navigate = useNavigate();

  const onClickJoinTeams = (id: number) => {
    navigate(`../team/${id}/home`);
  };

  const onClickRecentlyTeams = (id: number) => {
    navigate(`../team/${id}/home`);
  };

  return (
    <HomeTemp
      onClickJoinTeams={onClickJoinTeams}
      onClickRecentlyTeams={onClickRecentlyTeams}
    />
  );
};

export default Home;
