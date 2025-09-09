import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import PostList from './components/PostList';
import UserDetail from './components/UserDetail';
import PostDetail from './components/PostDetail';
import CreateUser from './components/CreateUser';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>GraphQL PostgreSQL Demo</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/create-user">Create User</Link>
              </li>
              <li>
                <Link to="/create-post">Create Post</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>GraphQL PostgreSQL Demo &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to GraphQL PostgreSQL Demo</h2>
      <p>This is a demonstration of a full-stack application using:</p>
      <ul>
        <li>GraphQL API with Apollo Server</li>
        <li>PostgreSQL database</li>
        <li>React frontend with Apollo Client</li>
      </ul>
      <div className="home-actions">
        <Link to="/users" className="button">View Users</Link>
        <Link to="/posts" className="button">View Posts</Link>
      </div>
    </div>
  );
}

export default App;
