import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

/**
 * Create Token
 *
 * @param {*} payload
 * @returns
 */
export const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

/**
 * Verify Token
 *
 * @param {*} token
 * @returns
 */
export const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return { data, error: null };
  } catch (error) {
    return { error, data: null };
  }
};
