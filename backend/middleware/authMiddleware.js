// Auth Middleware to verify JWT and extract ngoId
const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false,
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.ngoId = decryptedToken.ngoId;
    next();
  } catch (error) {
    console.log("Error in authMiddleware:", error);
    res.status(401).send({
      message: "You are not authorized to access",
      data: error.message,
      success: false,
    });
  }
}

module.exports = authMiddleware;
