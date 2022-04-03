import { VFC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import SearchTemp from 'components/templates/Search';
import { searchTeams } from 'db/team';
import { TeamWithImage } from 'type';

const Search: VFC = () => {
  const navigate = useNavigate();
  const [searchedTeams, setSearchedTeams] =
    useState<TeamWithImage[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onClick = (id: number) => {
    navigate(`../team/${id}`);
  };
  const onPressEnter = async (e: any) => {
    setLoading(true);
    setSearchedTeams(null);
    const text = e.target.value;
    const res = await searchTeams(text, 10);
    if (res.status === 'success') {
      setSearchedTeams(res.data);
    } else {
      message.error(res.message);
    }
    setLoading(false);
  };
  return (
    <>
      <SearchTemp
        searchedTeams={searchedTeams}
        onClickCard={onClick}
        onPressEnter={onPressEnter}
        loading={loading}
      />
    </>
  );
};

export default Search;
