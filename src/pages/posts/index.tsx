import { memo, Fragment, useEffect } from 'react';
import useStateIfMounted from '@/hooks/useSafeState';
import type { TPost } from '@/types/props';

type TProps = {};

const defaultProps = {};

const Posts = ({}: TProps) => {
  const [posts, setPosts] = useStateIfMounted<TPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/posts');
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Fragment key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </Fragment>
      ))}
    </div>
  );
};

Posts.defaultProps = defaultProps;

export default memo(Posts);
