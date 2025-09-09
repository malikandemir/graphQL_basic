import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// GraphQL query to fetch a single user by ID
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
      posts {
        id
        title
        createdAt
      }
    }
  }
`;

function UserDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;
  if (!data.user) return <p className="error-message">User not found</p>;

  const { user } = data;

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h2>{user.username}</h2>
        <Link to="/users" className="button">Back to Users</Link>
      </div>
      <div className="detail-content">
        <p><strong>Email:</strong> {user.email}</p>
        <p className="detail-meta">
          <strong>Created:</strong> {new Date(user.createdAt).toLocaleString()} | 
          <strong>Updated:</strong> {new Date(user.updatedAt).toLocaleString()}
        </p>
      </div>

      <h3>User's Posts</h3>
      {user.posts && user.posts.length > 0 ? (
        <div className="grid">
          {user.posts.map(post => (
            <Link to={`/posts/${post.id}`} key={post.id} className="card-link">
              <div className="card">
                <h4>{post.title}</h4>
                <p className="detail-meta">
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>This user hasn't created any posts yet.</p>
      )}
    </div>
  );
}

export default UserDetail;
