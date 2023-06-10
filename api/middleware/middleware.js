const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  console.log(
    ` a ${req.method} request to ${req.url} was made at ${new Date()}`
    )
  next();
}

async function validateUserId (req, res, next) {
  const { id } = req.params;

  try {
    const user = await Users.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      next(res.status(404).json({message: "user not found"}))
    }
  } catch (err) {
    next(err);
  }
}

async function validateUser(req, res, next) {
  const { name } = req.body;
  if (
    name !== undefined || name === null
  ) {
    next();
  } else {
    next(res.status(400).json({message: "missing required name field"}))
  }

}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (text) {
    next();
  } else {
    next(res.status(400).json({message: "missing required text field"}))
  }
}

// do not forget to expose these functions to other modules




module.exports = { 
  logger,
  validateUserId, 
  validateUser, 
  validatePost}
;