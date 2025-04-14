import { useGetPostsQuery } from './postApi';

const PostList = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts.</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostList;
