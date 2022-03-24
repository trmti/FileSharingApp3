import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Team,
  TeamPageProps,
  FolderWithImage,
  FetchFailed,
  FetchSuccess,
} from 'type';
import { getTeamById } from 'db/team';
import { getFoldersByTeamId } from 'db/folders';
import { createTeamPageProps } from 'utils/team';
import { getUrl } from 'utils';
import HomeTemp from 'components/templates/TeamHome';

type FetchTeamSuccess = FetchSuccess<Team>;

const Home: FC = () => {
  const [teamProp, setTeamProp] = useState<TeamPageProps | null>(null);
  const [folders, setFolders] = useState<FolderWithImage[] | null>(null);
  let { id } = useParams();
  let res: FetchTeamSuccess | FetchFailed;
  const onClickCard = (id: number) => {
    console.log(id);
  };
  const setNewFolders = async () => {
    const folders = await getFoldersByTeamId(Number(id));
    if (folders.status === 'success') {
      const foldersWithImage = Promise.all(
        folders.data.map(async (folder): Promise<FolderWithImage> => {
          const image = await getUrl(folder);
          return { ...folder, image };
        })
      );
      setFolders(await foldersWithImage);
    } else {
      setFolders(null);
    }
  };
  useEffect(() => {
    (async () => {
      res = id
        ? await getTeamById(Number(id))
        : { status: 'error', message: 'パラメータが正しくありません' };
      if (res.status === 'success') {
        const newProp = await createTeamPageProps(res.data);
        setTeamProp(newProp);
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
