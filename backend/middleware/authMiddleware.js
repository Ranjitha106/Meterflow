const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
   
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json("No token, access denied");
    }

    
    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

   
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json("Invalid token");
  }
};