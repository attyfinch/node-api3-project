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
    name.length > 2 &&
    name !== undefined &&
    typeof name === 'string'
  ) {
    next();
  } else {
    next(res.status(400).json({message: "missing required name field"}))
  }

}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

function defaultError(error, req, res, next) {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Gahhh! Something broke the users-router"
  })
};

// do not forget to expose these functions to other modules




module.exports = { 
  logger,
  validateUserId, 
  validateUser, 
  validatePost}
;