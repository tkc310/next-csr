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

export type ItemsQueryVariables = Exact<{ [key: string]: never }>;

export type ItemsQuery = { __typename?: 'Query' } & {
  items?: Maybe<
    Array<Maybe<{ __typename?: 'Item' } & Pick<Item, 'id' | 'name' | 'count'>>>
  >;
};

export type PostByQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type PostByQuery = { __typename?: 'Query' } & {
  post?: Maybe<
    { __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'content'>
  >;
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = { __typename?: 'Query' } & {
  posts?: Maybe<
    Array<
      Maybe<{ __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'content'>>
    >
  >;
};

export const ItemsDocument = gql`
  query items {
    items {
      id
      name
      count
    }
  }
`;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useItemsQuery(
  baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(
    ItemsDocument,
    options
  );
}
export function useItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(
    ItemsDocument,
    options
  );
}
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<
  ItemsQuery,
  ItemsQueryVariables
>;
export const PostByDocument = gql`
  query postBy($id: Int!) {
    post(id: $id) {
      id
      title
      content
    }
  }
`;

/**
 * __usePostByQuery__
 *
 * To run a query within a React component, call `usePostByQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostByQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostByQuery(
  baseOptions: Apollo.QueryHookOptions<PostByQuery, PostByQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostByQuery, PostByQueryVariables>(
    PostByDocument,
    options
  );
}
export function usePostByLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostByQuery, PostByQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostByQuery, PostByQueryVariables>(
    PostByDocument,
    options
  );
}
export type PostByQueryHookResult = ReturnType<typeof usePostByQuery>;
export type PostByLazyQueryHookResult = ReturnType<typeof usePostByLazyQuery>;
export type PostByQueryResult = Apollo.QueryResult<
  PostByQuery,
  PostByQueryVariables
>;
export const PostsDocument = gql`
  query posts {
    posts {
      id
      title
      content
    }
  }
`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    options
  );
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    options
  );
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<
  PostsQuery,
  PostsQueryVariables
>;
