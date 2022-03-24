import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TeamDescription, Folder, FetchFailed, FetchSuccess } from 'type';
import { getTeamById } from 'db/team';
import { getFoldersByTeamId } from 'db/folders';
import HomeTemp from 'components/templates/TeamHome';

type FetchTeamDescriptionSuccess = FetchSuccess<TeamDescription>;

const Home: FC = () => {
  const [teamProp, setTeamProp] = useState<TeamDescription | null>(null);
  const [folders, setFolders] = useState<Folder[] | null>(null);
  let { teamId } = useParams();
  const navigate = useNavigate();
  let res: FetchTeamDescriptionSuccess | FetchFailed;
  const onClickCard = (id: number) => {
    navigate(`folder/${id}`);
  };
  const setNewFolders = async () => {
    const folders = await getFoldersByTeamId(Number(teamId));
    if (folders.status === 'success') {
      setFolders(folders.data);
    } else {
      setFolders(null);
    }
  };
  useEffect(() => {
    (async () => {
      res = teamId
        ? await getTeamById(Number(teamId))
        : { status: 'error', message: 'パラメータが正しくありません' };
      if (res.status === 'success') {
        setTeamProp(res.data);
        await setNewFolders();
      } else {
        setTeamProp(null);
      }
    })();
  }, []);
  return (
    <>
      <HomeTemp team={teamProp} folders={folders} onClickCard={onClickCard} />
    </>
  );
};

export default Home;
