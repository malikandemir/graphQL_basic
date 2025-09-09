const { models } = require('./database');

const resolvers = {
  Query: {
    // User queries
    users: async () => {
      return await models.User.findAll();
    },
    user: async (_, { id }) => {
      return await models.User.findByPk(id);
    },
    
    // Post queries
    posts: async () => {
      return await models.Post.findAll();
    },
    post: async (_, { id }) => {
      return await models.Post.findByPk(id);
    },
    userPosts: async (_, { userId }) => {
      return await models.Post.findAll({
        where: { userId }
      });
    }
  },
  
  Mutation: {
    // User mutations
    createUser: async (_, { username, email }) => {
      return await models.User.create({ username, email });
    },
    updateUser: async (_, { id, username, email }) => {
      const user = await models.User.findByPk(id);
      if (!user) throw new Error('User not found');
      
      const updateData = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      
      await user.update(updateData);
      return user;
    },
    deleteUser: async (_, { id }) => {
      const user = await models.User.findByPk(id);
      if (!user) throw new Error('User not found');
      
      await user.destroy();
      return true;
    },
    
    // Post mutations
    createPost: async (_, { title, content, userId }) => {
      const user = await models.User.findByPk(userId);
      if (!user) throw new Error('User not found');
      
      return await models.Post.create({ title, content, userId });
    },
    updatePost: async (_, { id, title, content }) => {
      const post = await models.Post.findByPk(id);
      if (!post) throw new Error('Post not found');
      
      const updateData = {};
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      
      await post.update(updateData);
      return post;
    },
    deletePost: async (_, { id }) => {
      const post = await models.Post.findByPk(id);
      if (!post) throw new Error('Post not found');
      
      await post.destroy();
      return true;
    }
  },
  
  // Field resolvers
  User: {
    posts: async (user) => {
      return await models.Post.findAll({
        where: { userId: user.id }
      });
    }
  },
  
  Post: {
    author: async (post) => {
      return await models.User.findByPk(post.userId);
    }
  }
};

module.exports = { resolvers };
