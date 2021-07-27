module.exports = () => {
  const data = { posts: [] };
  for (let i = 0; i < 10; i++) {
    data.posts.push({
      id: i,
      title: `title${i}`,
      content: `content${i}`,
    });
  }
  return data;
};
