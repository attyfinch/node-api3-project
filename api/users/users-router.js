const express = require('express');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

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

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  await Users.update(req.user.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  Users.remove(req.user.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.user.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const newPost = await Posts.insert({user_id: req.user.id, text: req.body.text})
    res.status(201).json(newPost)
  } catch (err) {
    next(err)
  }


  // const newPost = await {user_id: req.user.id, text: req.body.text};
  

  // await Posts.insert(newPost)  
  //   .then(() => {
  //     res.status(201).json({newPost})
  //   })
  //   .catch(next)
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: 'You broke something in the users-router.'
  })
})

module.exports = router;
