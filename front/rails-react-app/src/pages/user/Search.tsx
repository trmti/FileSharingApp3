import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import SearchTemp from 'components/templates/Search';
import { searchTeams } from 'db/team';
import { TeamWithImage } from 'type';

type stateProps = {
  searchedTeams: TeamWithImage[] | null;
  loading: boolean;
};

const Search: FC = () => {
  const [state, setState] = useState<stateProps>({
    searchedTeams: null,
    loading: false,
  });
  const navigate = useNavigate();
  const onClick = (id: number) => {
    navigate(`../team/${id}`);
  };
  const onPressEnter = async (e: any) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const text = e.target.value;
    const res = await searchTeams(text, 10);
    if (res.status === 'success') {
      setState((prevState) => ({ ...prevState, searchedTeams: res.data }));
    } else {
      message.error(res.message);
    }
    setState((prevState) => ({ ...prevState, loading: false }));
  };
  return (
    <>
      <SearchTemp
        onClickCard={onClick}
        onPressEnter={onPressEnter}
        {...state}
      />
    </>
  );
};

export default Search;
