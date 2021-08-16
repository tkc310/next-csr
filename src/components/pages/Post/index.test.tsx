import { getPage } from 'next-page-tester';
import { screen } from '@testing-library/react';
import { PostFragment } from '@/graphql/generated/pages/post';

describe('Post', () => {
  const data: PostFragment = {
    post: {
      __typename: 'Post',
      id: '1',
      title: 'title foo',
      content: 'content',
    },
  };

  it('renders without crashing', async () => {
    const { render } = await getPage({
      route: '/',
    });

    render();
    // expect(screen.getByText('title foo')).toBeInTheDocument();
  });
});
