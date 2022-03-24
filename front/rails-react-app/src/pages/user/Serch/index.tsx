import { VFC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchTemp from 'components/templates/Search';
import { createTeamCard } from 'utils/user';
import { searchTeams } from 'db/team';
import { TeamWithImage } from 'type';

const Search: VFC = () => {
  const navigate = useNavigate();
  const [searchedTeams, setSearchedTeams] =
    useState<TeamWithImage[] | null>(null);
  const onClick = (id: number) => {
    navigate(`../team/${id}`);
  };
  const onPressEnter = async (e: any) => {
    setSearchedTeams(null);
    const text = e.target.value;
    const res = await searchTeams(text, 10);
    if (res.status === 'success') {
      const teams: TeamWithImage[] = await createTeamCard(res);
      setSearchedTeams(teams);
    }
  };
  return (
    <>
      <SearchTemp
        searchedTeams={searchedTeams}
        onClickCard={onClick}
        onPressEnter={onPressEnter}
      />
    </>
  );
};

export default Search;