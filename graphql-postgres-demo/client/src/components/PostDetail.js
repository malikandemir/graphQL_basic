import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// GraphQL query to fetch a single post by ID
const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
      author {
        id
        username
      }
    }
  }
`;

function PostDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;
  if (!data.post) return <p className="error-message">Post not found</p>;

  const { post } = data;

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h2>{post.title}</h2>
        <Link to="/posts" className="button">Back to Posts</Link>
      </div>
      <div className="detail-meta">
        <p>
          <strong>Author:</strong> <Link to={`/users/${post.author.id}`}>{post.author.username}</Link> | 
          <strong>Created:</strong> {new Date(post.createdAt).toLocaleString()} | 
          <strong>Updated:</strong> {new Date(post.updatedAt).toLocaleString()}
        </p>
      </div>
      <div className="detail-content">
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
      </div>
    </div>
  );
}

export default PostDetail;
