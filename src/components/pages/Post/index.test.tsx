import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import prettier from 'prettier';
import { getPage } from 'next-page-tester';
import { MockedProvider } from '@apollo/client/testing';
import { PostIndexDocument } from '@/graphql/generated/pages/post';

const post = {
  __typename: 'Post',
  id: '1',
  title: 'titile foo',
  content: 'content foo',
};

const mocks = [
  {
    request: {
      query: PostIndexDocument,
      variables: {
        id: 1,
      },
    },
    result: {
      data: {
        post,
      },
    },
  },
];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getNextPage = async (route: string) => {
  const pageTester = await getPage({
    nextRoot: `${process.cwd()}/src`,
    route,
    useDocument: false,
    wrapper: {
      // eslint-disable-next-line react/display-name
      Page: (Page) => (pageProps) => {
        return (
          <MockedProvider mocks={mocks} addTypename={false}>
            <Page {...pageProps} />
          </MockedProvider>
        );
      },
    },
  });

  return pageTester;
};

describe('Post', () => {
  it('hoge', () => {
    expect(0).toEqual(0);
  });

  it('renders without crashing', async () => {
    const loadingText = 'Loading';

    // next-page-testerのサンプル
    // @see https://github.com/toomuchdesign/next-page-tester/blob/master/examples/03-apollo-client.md
    const { render: nextRender } = await getNextPage('/posts/1');
    const { nextRoot } = nextRender();

    expect(screen.getByText(loadingText)).toBeInTheDocument();

    const loadingSnapshot = prettier.format(nextRoot.outerHTML, {
      parser: 'html',
    });
    // snapshot作成・比較
    expect(loadingSnapshot).toMatchSnapshot();

    // コンポーネントの状態変更はactでラップする
    // @see https://ja.reactjs.org/docs/test-utils.html#act
    await act(async () => {
      // 通信完了を待機
      await waitForElementToBeRemoved(() => screen.getByText(loadingText));
    });

    expect(
      screen.getByRole('heading', { name: 'Post Detail' })
    ).toBeInTheDocument();

    const loadedSnapshot = prettier.format(nextRoot.outerHTML, {
      parser: 'html',
    });
    expect(loadedSnapshot).toMatchSnapshot();
  });
});
