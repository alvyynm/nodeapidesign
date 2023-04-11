import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hashedPwd) => {
  return bcrypt.compare(password, hashedPwd);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 8);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  return token;
};

export const protect = (req, res, next) => {
  // check if there's an authorization header in the request
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  // read the token value included in the Bearer token
  const token = bearer.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  // verify auntheticity of the token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // pass user object to every api call
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
