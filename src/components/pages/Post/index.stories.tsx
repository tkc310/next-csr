import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PostPresentational } from './index';

export default {
  title: 'components/pages/Post',
  component: PostPresentational,
} as ComponentMeta<typeof PostPresentational>;

const Template: ComponentStory<typeof PostPresentational> = (args) => (
  <PostPresentational {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: {
    post: {
      __typename: 'Post',
      id: '1',
      title: 'post title',
      content: 'post content',
    },
  },
};
