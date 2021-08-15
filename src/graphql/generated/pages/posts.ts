import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateItem = {
  __typename?: 'CreateItem';
  item?: Maybe<Item>;
};

export type CreatePost = {
  __typename?: 'CreatePost';
  post?: Maybe<Post>;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['ID'];
  name: Scalars['String'];
  count: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<CreatePost>;
  createItem?: Maybe<CreateItem>;
};

export type MutationCreatePostArgs = {
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type MutationCreateItemArgs = {
  count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  posts?: Maybe<Array<Maybe<Post>>>;
  post?: Maybe<Post>;
  items?: Maybe<Array<Maybe<Item>>>;
};

export type QueryPostArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type PostsIndexQueryVariables = Exact<{ [key: string]: never }>;

export type PostsIndexQuery = { __typename?: 'Query' } & PostsFragment;

export type PostsFragment = { __typename?: 'Query' } & {
  posts?: Maybe<
    Array<
      Maybe<{ __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'content'>>
    >
  >;
};

export const PostsFragmentDoc = gql`
  fragment Posts on Query {
    posts {
      id
      title
      content
    }
  }
`;
export const PostsIndexDocument = gql`
  query PostsIndex {
    ...Posts
  }
  ${PostsFragmentDoc}
`;

/**
 * __usePostsIndexQuery__
 *
 * To run a query within a React component, call `usePostsIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsIndexQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PostsIndexQuery,
    PostsIndexQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostsIndexQuery, PostsIndexQueryVariables>(
    PostsIndexDocument,
    options
  );
}
export function usePostsIndexLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PostsIndexQuery,
    PostsIndexQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostsIndexQuery, PostsIndexQueryVariables>(
    PostsIndexDocument,
    options
  );
}
export type PostsIndexQueryHookResult = ReturnType<typeof usePostsIndexQuery>;
export type PostsIndexLazyQueryHookResult = ReturnType<
  typeof usePostsIndexLazyQuery
>;
export type PostsIndexQueryResult = Apollo.QueryResult<
  PostsIndexQuery,
  PostsIndexQueryVariables
>;
