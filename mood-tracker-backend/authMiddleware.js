const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token." });
  }
}

module.exports = verifyToken;
