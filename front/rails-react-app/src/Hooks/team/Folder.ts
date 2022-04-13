import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  Folder,
  BuildFolderParams,
  FileWithImage,
  BuildFileParams,
  User,
} from 'type';
import { showFolder } from 'db/folders';
import { getFilesByFolderId } from 'db/file';
import { updateSome, deleteSome, createSome } from 'db/utils';
import { useAsyncCallback, isInEditor, isInLeader } from 'utils';

type folderProps = {
  folder: Folder | null;
  isEditor: boolean;
  loadingFolder: boolean;
  files: FileWithImage[];
};

const useFolder = (folderId: number, teamId: number, authUser: User | null) => {
  const navigate = useNavigate();
  const [state, setState] = useState<folderProps>({
    folder: null,
    isEditor: false,
    loadingFolder: false,
    files: [],
  });

  // ---- file --------------------------------
  const setNewFiles = useAsyncCallback(async () => {
    setState((prevState) => ({ ...prevState, loadingFile: true }));
    const newFiles = await getFilesByFolderId(Number(folderId));
    if (newFiles.status === 'success') {
      setState((prevState) => ({ ...prevState, files: newFiles.data }));
    } else {
      setState((prevState) => ({ ...prevState, files: [] }));
    }
    setState((prevState) => ({ ...prevState, loadingFile: false }));
  }, [folderId]);
  const UpdateFile = useAsyncCallback(
    async (data: BuildFileParams & { fileId: number }) => {
      const { fileId, ...otherProps } = data;
      const res = await updateSome('file_contents', { ...otherProps }, fileId);
      if (res.status !== 'error') {
        message.success('ファイルの情報を更新しました。');
        await setNewFiles();
      } else {
        message.error('ファイルの更新に失敗しました。');
      }
    },
    []
  );
  const UpdateFileFailed = () => {
    message.error('ファイルの更新に失敗しました');
  };
  const BuildFile = useAsyncCallback(
    async (data: BuildFileParams) => {
      if (!data.file) {
        message.error('画像を選択してください');
        return;
      }
      const res = folderId
        ? await createSome('folders', 'file_content', data, Number(folderId))
        : null;
      if (res?.status === 'success') {
        message.success('ファイルの作成に成功しました');
        await setNewFiles();
      } else {
        message.error(res?.message);
      }
    },
    [folderId]
  );
  const BuildFileFailed = () => {
    message.error('画像を選択してください');
  };
  const onDeleteFile = useAsyncCallback(async (fileId: number) => {
    const res = await deleteSome(fileId, 'file_contents');
    if (res.status === 'success') {
      await setNewFiles();
      message.success(res.data.message);
    } else {
      message.error(res.message);
    }
  }, []);

  // ---- folder --------------------------------
  const setNewFolder = useAsyncCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      loadingFolder: true,
    }));
    const folder = folderId ? await showFolder(folderId) : null;
    if (folder?.status === 'success') {
      setState((prevState) => ({
        ...prevState,
        folder: folder.data,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        folder: null,
      }));
    }
    setState((prevState) => ({
      ...prevState,
      loadingFolder: false,
    }));
  }, [folderId]);

  const UpdateFolder = useAsyncCallback(
    async (data: BuildFolderParams) => {
      setState((prevState) => ({ ...prevState, loadingFolder: true }));
      const res = folderId ? await updateSome('folders', data, folderId) : null;
      if (res?.status !== 'error') {
        message.success('フォルダを更新しました。');
        const folder = await showFolder(folderId);
        if (folder?.status === 'success') {
          setState((prevState) => ({ ...prevState, folder: folder.data }));
        } else {
          message.error('フォルダーが存在しません');
          navigate('..');
        }
      } else {
        message.error(res?.message);
      }
      setState((prevState) => ({
        ...prevState,
        loadingFolder: false,
      }));
    },
    [folderId]
  );
  const UpdateFolderFailed = () => {
    message.error('フォルダの更新に失敗しました');
  };
  const DeleteFolder = useAsyncCallback(async () => {
    const res = await deleteSome(folderId, 'folders');
    if (res.status === 'success') {
      message.success(res.data.message);
      navigate(`/user/team/${teamId}`);
    } else {
      message.error(res.message);
    }
  }, [folderId]);

  const onChangeSort = (value: string) => {
    console.log(value);
  };
  // フォルダーをセット
  useEffect(() => {
    (async () => {
      await setNewFolder();
    })();
  }, []);
  // ファイルをセット
  useEffect(() => {
    (async () => {
      await setNewFiles();
    })();
  }, []);
  // エディターをセット
  useEffect(() => {
    if (folderId && authUser) {
      (async () => {
        const isEditor = await isInEditor(teamId, authUser.id);
        const isLeader = await isInLeader(teamId, authUser.id);
        setState((prevState) => ({
          ...prevState,
          isEditor,
          isLeader,
        }));
      })();
    }
  }, [folderId, authUser, teamId]);
  return [
    state,
    {
      UpdateFolder,
      UpdateFolderFailed,
      DeleteFolder,
      UpdateFile,
      UpdateFileFailed,
      BuildFile,
      BuildFileFailed,
      onChangeSort,
      onDeleteFile,
    },
  ] as const;
};

export default useFolder;
