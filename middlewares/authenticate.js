import { httpError } from "./../helpers/httpError.js";
import { verifyToken } from "./../helpers/jwt.js";
import { findUser } from "./../services/authService.js";

/**
 * Auth
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authenticate = async (req, res, next) => {
  const authorization = req.get("Authorization");
  if (!authorization) throw httpError(401, "Not authorized");

  const [bearer, token] = authorization.split(" ");
  if (bearer !== bearer) throw httpError(401, "Not authorized");

  const { data, error } = await verifyToken(token);
  if (error) throw httpError(401, e.message);

  const user = await findUser({ id: data.id });
  if (!user) throw httpError(401, "User not found");

  req.user = user;
  next();
};

export default authenticate;
