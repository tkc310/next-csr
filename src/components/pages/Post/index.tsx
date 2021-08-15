import { FC } from 'react';
import { filter } from 'graphql-anywhere';
import {
  PostFragment,
  PostFragmentDoc,
  usePostIndexQuery,
} from '@/graphql/generated/pages/post';
import { useRouter } from 'next/dist/client/router';

type Props = {
  data: PostFragment;
};

// presentational component
export const PostPresentational: FC<Props> = ({ data }) => {
  const { post } = data;

  return post ? (
    <>
      <h1>Post Detail</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </>
  ) : (
    <p>Postが存在しません</p>
  );
};

// container component
const PostsContainer: FC = () => {
  const router = useRouter();
  const { post_id } = router.query;
  const id = parseInt(String(post_id));

  const { data, loading, error } = usePostIndexQuery({
    variables: { id: id },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <PostPresentational data={filter<PostFragment>(PostFragmentDoc, data)} />
  );
};

export default PostsContainer;
