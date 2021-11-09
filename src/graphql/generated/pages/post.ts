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

export type PostIndexQueryVariables = Exact<{
  id: Scalars['Int'];
  editable: Scalars['Boolean'];
}>;

export type PostIndexQuery = { __typename?: 'Query' } & PostFragment;

export type PostFragment = { __typename?: 'Query' } & {
  post?: Maybe<
    { __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'content'>
  >;
};

export const PostFragmentDoc = gql`
  fragment Post on Query {
    post(id: $id) @include(if: $editable) {
      id
      title
      content
    }
  }
`;
export const PostIndexDocument = gql`
  query PostIndex($id: Int!, $editable: Boolean!) {
    ...Post
  }
  ${PostFragmentDoc}
`;

/**
 * __usePostIndexQuery__
 *
 * To run a query within a React component, call `usePostIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostIndexQuery({
 *   variables: {
 *      id: // value for 'id'
 *      editable: // value for 'editable'
 *   },
 * });
 */
export function usePostIndexQuery(
  baseOptions: Apollo.QueryHookOptions<PostIndexQuery, PostIndexQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostIndexQuery, PostIndexQueryVariables>(
    PostIndexDocument,
    options
  );
}
export function usePostIndexLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PostIndexQuery,
    PostIndexQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostIndexQuery, PostIndexQueryVariables>(
    PostIndexDocument,
    options
  );
}
export type PostIndexQueryHookResult = ReturnType<typeof usePostIndexQuery>;
export type PostIndexLazyQueryHookResult = ReturnType<
  typeof usePostIndexLazyQuery
>;
export type PostIndexQueryResult = Apollo.QueryResult<
  PostIndexQuery,
  PostIndexQueryVariables
>;
