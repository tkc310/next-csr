import { memo, Fragment, useEffect } from 'react';
import useStateIfMounted from '@/hooks/useSafeState';
import { usePostsQuery } from '@/graphql';
import type { TPost } from '@/types/props';

type TProps = {};

const defaultProps = {};

const Posts = ({}: TProps) => {
  const { data, loading, error } = usePostsQuery();

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h1>Posts</h1>
      {data?.posts
        ? data.posts.map((post) => (
            <Fragment key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </Fragment>
          ))
        : null}
    </div>
  );
};

Posts.defaultProps = defaultProps;

export default memo(Posts);
