import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

// GraphQL query to fetch all users
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
      createdAt
    }
  }
`;

function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      <div className="grid">
        {data.users.map(user => (
          <Link to={`/users/${user.id}`} key={user.id} className="card-link">
            <div className="card">
              <h3>{user.username}</h3>
              <p>{user.email}</p>
              <p className="detail-meta">Created: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
      {data.users.length === 0 && (
        <p>No users found. <Link to="/create-user">Create a new user</Link>.</p>
      )}
    </div>
  );
}

export default UserList;
