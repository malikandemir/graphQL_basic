const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post!]
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    # User queries
    users: [User!]!
    user(id: ID!): User
    
    # Post queries
    posts: [Post!]!
    post(id: ID!): Post
    userPosts(userId: ID!): [Post!]!
  }

  type Mutation {
    # User mutations
    createUser(username: String!, email: String!): User!
    updateUser(id: ID!, username: String, email: String): User!
    deleteUser(id: ID!): Boolean!
    
    # Post mutations
    createPost(title: String!, content: String!, userId: ID!): Post!
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): Boolean!
  }
`;

module.exports = { typeDefs };
