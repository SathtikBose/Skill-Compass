const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach the user id to the request object
      req.user = { id: decoded.id };
      
      next();
    } catch (error) {
      const err = new Error('Not authorized, token failed');
      err.statusCode = 401;
      next(err);
    }
  } else {
    const error = new Error('Not authorized, no token');
    error.statusCode = 401;
    next(error);
  }
};

module.exports = { protect };
