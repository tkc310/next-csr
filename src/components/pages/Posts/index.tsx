import { FC } from 'react';
import Link from 'next/link';
import { filter } from 'graphql-anywhere';
import {
  Post,
  PostsFragment,
  PostsFragmentDoc,
  usePostsIndexQuery,
} from '@/graphql/generated/pages/posts';

type Props = {
  data: PostsFragment;
};

// presentational component
export const PostsPresentational: FC<Props> = ({ data }) => {
  const { posts } = data;

  const castedPosts = posts as Post[];
  const postsNode = castedPosts.map((post) => (
    <li key={post.id} style={{ marginBottom: '16px' }}>
      <p style={{ fontWeight: 'bold' }}>{post.title}</p>
      <p>{post.content}</p>
      <div>
        <Link href={`/posts/${post?.id}`}>詳細</Link>
      </div>
    </li>
  ));

  return posts && posts.length ? (
    <>
      <ul>{postsNode}</ul>
    </>
  ) : (
    <p>Postが存在しません</p>
  );
};

// container component
const PostsContainer: FC = () => {
  const { data, loading, error } = usePostsIndexQuery();

  // TODO: ローディングコンポーネント
  if (loading) return <>Loading...</>;
  // TODO: graphqlのエラーハンドリング、500系のエラーページ
  if (error) return <>Error...</>;

  return (
    <PostsPresentational data={filter<PostsFragment>(PostsFragmentDoc, data)} />
  );
};

export default PostsContainer;
