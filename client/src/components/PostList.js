import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

// GraphQL query to fetch all posts
const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      createdAt
      author {
        id
        username
      }
    }
  }
`;

function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <div className="grid">
        {data.posts.map(post => (
          <Link to={`/posts/${post.id}`} key={post.id} className="card-link">
            <div className="card">
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <p className="detail-meta">
                By: {post.author.username} | 
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {data.posts.length === 0 && (
        <p>No posts found. <Link to="/create-post">Create a new post</Link>.</p>
      )}
    </div>
  );
}

export default PostList;
