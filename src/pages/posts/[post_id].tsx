import { Fragment } from 'react';
import { NextPage } from 'next';
import { usePostByQuery } from '@/graphql/generates';
import { useRouter } from 'next/dist/client/router';

type Props = {};

const defaultProps = {};

const Posts: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { post_id } = router.query;
  const id = parseInt(String(post_id));

  const { data, loading, error } = usePostByQuery({
    variables: { id: id },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const post = data?.post;

  return (
    <div>
      <h1>Post Detail</h1>
      {post ? (
        <Fragment key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </Fragment>
      ) : null}
    </div>
  );
};

Posts.defaultProps = defaultProps;

export default Posts;
