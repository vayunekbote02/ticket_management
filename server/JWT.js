require("dotenv").config();

const jwt = require("jsonwebtoken");

// Middleware function to authenticate the token
const authenticateToken = (req, res, next) => {
  try {
    // Retrieve the token from the request headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      // Token not provided, return unauthorized
      return res.sendStatus(401);
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        // Token verification failed, return forbidden
        return res.sendStatus(403);
      }

      // Token is valid, set the userId on the request object, this ayload userId is being signed while login
      req.userId = payload.userId;
      next();
    });
  } catch (error) {
    // Error occurred, return internal server error
    res.sendStatus(500);
  }
};

// Export the middleware function
module.exports = authenticateToken;
