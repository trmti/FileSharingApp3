import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuthUser } from 'auth/AuthUserContext';
import { showFolder } from 'db/folders';
import { getFilesByFolderId } from 'db/file';
import { deleteSome, updateSome, createSome } from 'db/utils';
import { isInEditor } from 'utils';
import {
  Folder as FolderType,
  FileWithImage,
  BuildFileParams,
  BuildFolderParams,
} from 'type';
import FolderTemp from 'components/templates/Folder';

const Folder: FC = () => {
  const [files, setFiles] = useState<FileWithImage[] | null>(null);
  const [folder, setFolder] = useState<FolderType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFolder, setLoadingFolder] = useState<boolean>(false);
  const { folderId, teamId } = useParams();
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const onClick = (id: number) => {
    console.log(id);
  };
  const setNewFiles = async () => {
    setLoading(true);
    const newFiles = await getFilesByFolderId(Number(folderId));
    if (newFiles.status === 'success') {
      setFiles(newFiles.data);
    } else {
      setFiles(null);
    }
    setLoading(false);
  };
  const onChangeSort = (value: string) => {
    console.log(value);
  };
  const BuildFile = async (data: BuildFileParams) => {
    const res = folderId
      ? await createSome('folders', 'file_content', data, Number(folderId))
      : null;
    if (res?.status === 'success') {
      message.success('ファイルの作成に成功しました');
      setIsModalVisible(false);
      await setNewFiles();
    } else {
      message.error(res?.message);
    }
  };
  const BuildFileFailed = () => {
    message.error('画像を選択してください');
  };
  const UpdateFolder = async (data: BuildFolderParams) => {
    setLoadingFolder(true);
    const res = folderId
      ? await updateSome('folders', data, Number(folderId))
      : null;
    if (res?.status !== 'error') {
      message.success('フォルダを更新しました。');
      const folder = await showFolder(Number(folderId));
      if (folder?.status === 'success') {
        setFolder(folder.data);
      } else {
        message.error('フォルダーが存在しません');
        navigate('..');
      }
      setIsModalVisible(false);
      setIsEditModalVisible(false);
    } else {
      message.error(res?.message);
    }
    setLoadingFolder(false);
  };
  const UpdateFolderFailed = () => {
    message.error('フォルダの更新に失敗しました');
  };
  const onDeleteFolder = async () => {
    const res = await deleteSome(Number(folderId), 'folders');
    if (res.status === 'success') {
      message.success(res.data.message);
      navigate(`/user/team/${teamId}`);
    } else {
      message.error(res.message);
    }
  };
  const onDeleteFile = async (fileId: number) => {
    const res = await deleteSome(fileId, 'file_contents');
    if (res.status === 'success') {
      await setNewFiles();
      message.success(res.data.message);
    } else {
      message.error(res.message);
    }
  };
  const UpdateFile = async (data: BuildFileParams & { fileId: number }) => {
    const { fileId, ...otherProps } = data;
    const res = await updateSome('file_contents', { ...otherProps }, fileId);
    if (res.status !== 'error') {
      message.success('ファイルの情報を更新しました。');
      await setNewFiles();
    } else {
      message.error('ファイルの更新に失敗しました。');
    }
    setIsEditModalVisible(false);
  };
  const UpdateFileFailed = () => {
    message.error('ファイルの更新に失敗しました');
  };
  useEffect(() => {
    if (folderId && authUser) {
      setLoadingFolder(true);
      (async () => {
        await setNewFiles();
        setIsEditor(await isInEditor(Number(teamId), authUser.id));
        const folder = folderId ? await showFolder(Number(folderId)) : null;
        if (folder?.status === 'success') {
          setFolder(folder.data);
        } else {
          setFolder(null);
        }
        setLoadingFolder(false);
      })();
    }
  }, [folderId]);
  return (
    <>
      <FolderTemp
        files={files}
        onClick={onClick}
        onChangeSort={onChangeSort}
        folder={folder}
        BuildFile={BuildFile}
        BuildFileFailed={BuildFileFailed}
        UpdateFolder={UpdateFolder}
        UpdateFolderFailed={UpdateFolderFailed}
        DeleteFolder={onDeleteFolder}
        DeleteFile={onDeleteFile}
        UpdateFile={UpdateFile}
        UpdateFileFailed={UpdateFileFailed}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        isEditor={isEditor}
        loading={loading}
        loadingFolder={loadingFolder}
      />
    </>
  );
};

export default Folder;
