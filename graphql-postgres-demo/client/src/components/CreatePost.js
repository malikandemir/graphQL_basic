import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

// GraphQL query to fetch all users for the dropdown
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

// GraphQL mutation to create a new post
const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $userId: ID!) {
    createPost(title: $title, content: $content, userId: $userId) {
      id
      title
      content
    }
  }
`;

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch users for the dropdown
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);

  const [createPost, { loading: postLoading }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      navigate(`/posts/${data.createPost.id}`);
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!title.trim() || !content.trim() || !userId) {
      setError('Title, content, and author are required');
      return;
    }

    // Submit the form
    createPost({ variables: { title, content, userId } });
  };

  if (usersLoading) return <p>Loading users...</p>;
  if (usersError) return <p className="error-message">Error loading users: {usersError.message}</p>;

  return (
    <div>
      <h2>Create New Post</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={postLoading}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={postLoading}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="userId">Author:</label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={postLoading}
            required
          >
            <option value="">Select an author</option>
            {usersData.users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
          {usersData.users.length === 0 && (
            <p className="error-message">No users available. Please create a user first.</p>
          )}
        </div>
        
        <button 
          type="submit" 
          className="button" 
          disabled={postLoading || usersData.users.length === 0}
        >
          {postLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
