import * as service from "../services/authService.js";

/**
 * Registration
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const registerUser = async (req, res) => {
  // console.log(req.body);
  const newUser = await service.registerUser(req.body);
  return res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

/**
 * Login
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const loginUser = async (req, res) => {
  const token = await service.loginUser(req.body);
  return res.status(200).json({ token });
};

/**
 * Current
 *
 * @param {*} req
 * @param {*} res
 */
export const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  return res.json({ email, subscription });
};

/**
 * Logout
 *
 * @param {*} req
 * @param {*} res
 */
export const logoutUser = async (req, res) => {
  await service.logoutUser(req.user);
  res.status(204).send();
};
