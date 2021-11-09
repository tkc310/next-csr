import { FC } from 'react';
import { filter } from 'graphql-anywhere';
import {
  PostFragment,
  PostFragmentDoc,
  usePostIndexQuery,
} from '@/graphql/generated/pages/post';
import { useRouter } from 'next/dist/client/router';
import styles from './index.module.scss';

type Props = {
  data: PostFragment;
};

// presentational component
export const PostPresentational: FC<Props> = ({ data }) => {
  const { post } = data;

  return (
    <div className={styles.container}>
      {post ? (
        <>
          <h1>Post Detail Test</h1>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      ) : (
        <p>Postが存在しません</p>
      )}
    </div>
  );
};

// container component
const PostsContainer: FC = () => {
  const router = useRouter();
  const { post_id } = router.query;
  const id = parseInt(String(post_id));
  const editable = false;

  const { data, loading, error } = usePostIndexQuery({
    variables: {
      id,
      editable,
    },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <PostPresentational
      data={filter<PostFragment>(PostFragmentDoc, data, { editable })}
    />
  );
};

export default PostsContainer;
