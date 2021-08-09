import { Fragment } from 'react';
import { NextPage } from 'next';
import { usePostsQuery } from '@/graphql/generates';
import Link from 'next/link';

type TProps = {};

const defaultProps = {};

const Posts: NextPage<TProps> = ({}) => {
  const { data, loading, error } = usePostsQuery();

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const posts = data?.posts;

  return (
    <div>
      <h1>Posts</h1>
      {posts && posts.length
        ? posts.map((post) => (
            <Fragment key={post?.id}>
              <h2>{post?.title}</h2>
              <p>{post?.content}</p>
              <Link href={`/posts/${post?.id}`}>詳細</Link>
            </Fragment>
          ))
        : null}
    </div>
  );
};

Posts.defaultProps = defaultProps;

export default Posts;
