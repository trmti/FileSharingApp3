import { VFC, useState, useEffect } from 'react';
import { useAuthUser } from 'auth/AuthUserContext';
import SearchTemp from 'components/templates/Search';
import { makeCardData } from 'utils';
import { searchTeams } from 'db/team';
import { TeamWithImage } from 'type';

const Search: VFC = () => {
  const [searchedTeams, setSearchedTeams] =
    useState<TeamWithImage[] | null>(null);
  const onClick = (id: number) => {
    console.log(id);
  };
  const onPressEnter = async (e: any) => {
    setSearchedTeams(null);
    const text = e.target.value;
    const res = await searchTeams(text, 10);
    if (res.status === 'success') {
      const teams: TeamWithImage[] = await makeCardData(res);
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
