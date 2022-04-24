import { useState, useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';
import { showFile } from 'db/file';
import { createComment, getComments } from 'db/comments';
import { useAsyncCallback } from 'utils';
import { CommentWithImage, User, FileWithImage } from 'type';

type chatProps = {
  comments: CommentWithImage[];
  file: FileWithImage | null;
};

const useChat = (authUser: User | null, fileId: number) => {
  const [state, setState] = useState<chatProps>({
    comments: [],
    file: null,
  });
  const [connected, setConnected] = useState<boolean>(false);
  const setFile = useAsyncCallback(async () => {
    const res = await showFile(fileId);
    if (res.status === 'success') {
      setState((prevState) => ({ ...prevState, file: res.data }));
    }
  }, [fileId]);
  const setNewComments = useAsyncCallback(async () => {
    const res = await getComments(fileId);
    if (res.status === 'success') {
      setState((prevState) => ({ ...prevState, comments: res.data }));
    } else {
      setState((prevState) => ({ ...prevState, comments: [] }));
    }
  }, [fileId]);
  const createNewComment = async (newComment: string) => {
    if (authUser) {
      await createComment(newComment, authUser.id, fileId);
    }
  };
  const cable = createConsumer(process.env.REACT_APP_MY_WS_HOST);
  const createSubscription = () => {
    cable.subscriptions.create(
      {
        channel: 'CommentsChannel',
        id: fileId,
      },
      {
        connected: () => {
          console.log('connected');
          setConnected(true);
        },
        disconnected: () => {
          console.log('disconnected');
          setConnected(false);
        },
        received: (data: CommentWithImage) => {
          setState((prevState) => ({
            ...prevState,
            comments: [data, ...prevState.comments],
          }));
        },
      }
    );
  };
  useEffect(() => {
    (async () => {
      await setNewComments();
      await setFile();
    })();
    if (!connected) {
      createSubscription();
    }
    return () => {
      cable.disconnect();
    };
  }, []);
  return [state, { createNewComment }] as const;
};

export default useChat;
