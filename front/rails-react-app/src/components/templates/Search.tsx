import { FC } from 'react';
import { Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SearchTeam from 'components/organisms/SearchTeam';
import TitleWithLine from 'components/atoms/TileWithLine';
import { TeamWithImage } from 'type';

type Props = {
  searchedTeams: TeamWithImage[] | null;
  onClickCard: (id: number) => void;
  onPressEnter: (e: any) => void;
  loading: boolean;
};

const Search: FC<Props> = ({
  searchedTeams,
  onClickCard,
  onPressEnter,
  loading,
}) => {
  return (
    <>
      <div style={{ width: '90%', margin: '0 auto', textAlign: 'center' }}>
        <TitleWithLine style={{ display: 'block' }}>チームを探す</TitleWithLine>
        <Input
          placeholder="Search Team By Name or Label"
          style={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 100,
            marginTop: 40,
            marginBottom: 50,
          }}
          prefix={
            <img
              alt=""
              src={'http://localhost:8000/icon/Search.png'}
              width={35}
              height={35}
            />
          }
          onPressEnter={onPressEnter}
        />
        <div>
          <TitleWithLine style={{ marginBottom: 100 }}>
            見つかったチーム
          </TitleWithLine>
        </div>
        {loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} />} />
        ) : (
          <SearchTeam searchedTeams={searchedTeams} onClickCard={onClickCard} />
        )}
      </div>
    </>
  );
};

export default Search;
