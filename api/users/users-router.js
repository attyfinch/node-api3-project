const express = require('express');
const { validateUserId } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {    
    const users = await Users.get();
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }

  // Alternate way to code this.
  //  Users.get()
  //   .then(users => {
  //     throw new Error('test test test')
  //     res.status(200).json(users)
  //   })
  //   .catch(next)
});

router.get('/:id', validateUserId, async (req, res, next) => {  
  res.status(200).json(req.user)
});

router.post('/', async (req, res) => {
  

});

router.put('/:id', async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      const deletedUser = user;
      Users.remove(id)
        .then(() => {
          res.status(200).json(deletedUser);
        })
        .catch(defaultError)
    })
    .catch(defaultError)
});

router.get('/:id/posts', async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;

  try {
    const posts = await Users.getUserPosts(id);
    res.status(200).json(posts);
  } catch (defaultError) {
    next(defaultError);
  }

});

router.post('/:id/posts', async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: 'You broke something in the users-router.'
  })
})

module.exports = router;
