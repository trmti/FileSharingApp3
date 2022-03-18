import { VFC, useEffect } from 'react';
import { getPosts } from 'db/post';

const Post: VFC = () => {
  const handleGetPosts = async () => {
    const { data } = await getPosts();
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return <></>;
};

export default Post;
