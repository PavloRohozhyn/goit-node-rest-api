import * as service from "../services/authService.js";

/**
 * Registration
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const registerUser = async (req, res) => {
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
 * Avatar
 *
 * @param {*} req
 * @param {*} res
 */
export const avatarUser = async (req, res) => {
  const { id: owner } = req.user;
  const avatarURL = await service.avatarUser(owner, req.file);
  return res.status(200).json({ avatarURL });
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
