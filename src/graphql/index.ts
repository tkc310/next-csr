import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHoc from '@apollo/client/react/hoc';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  items?: Maybe<Array<Maybe<Item>>>;
};

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = (
  { __typename?: 'Query' }
  & { items?: Maybe<Array<Maybe<(
    { __typename?: 'Item' }
    & Pick<Item, 'id' | 'name' | 'count'>
  )>>> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content'>
  )>>> }
);


export const ItemsDocument = gql`
    query items {
  items {
    id
    name
    count
  }
}
    `;
export type ItemsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ItemsQuery, ItemsQueryVariables>
    } & TChildProps;
export function withItems<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ItemsQuery,
  ItemsQueryVariables,
  ItemsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ItemsQuery, ItemsQueryVariables, ItemsProps<TChildProps, TDataName>>(ItemsDocument, {
      alias: 'items',
      ...operationOptions
    });
};

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
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;
export const PostsDocument = gql`
    query posts {
  posts {
    id
    title
    content
  }
}
    `;
export type PostsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PostsQuery, PostsQueryVariables>
    } & TChildProps;
export function withPosts<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PostsQuery,
  PostsQueryVariables,
  PostsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PostsQuery, PostsQueryVariables, PostsProps<TChildProps, TDataName>>(PostsDocument, {
      alias: 'posts',
      ...operationOptions
    });
};

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
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;