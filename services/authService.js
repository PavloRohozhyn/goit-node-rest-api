import bcrypt from "bcrypt";
import User from "./../db/models/User.js";
import { httpError } from "./../helpers/httpError.js";
import { createToken } from "./../helpers/jwt.js";

export const findUser = (where) => User.findOne({ where });

/**
 * register
 * @param {*} payload
 * @returns
 */
export const registerUser = async (payload) => {
  const hashpass = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashpass });
};

/**
 * Refresh user
 *
 * @param {*} user
 * @returns
 */
export const refreshUser = async (user) => {
  const token = await createToken({ id: user.id }); // create token
  await user.update({ token });
  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

/**
 * Login
 *
 * @param {*} param0
 * @returns
 */
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) throw httpError(401, "Email or password is wrong");

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) throw httpError(401, "Email or password is wrong");

  const token = await createToken({ id: user.id }); // create token

  await user.update({ token }); // update user token

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

/**
 * Logout
 *
 * @param {*} user
 * @returns
 */
export const logoutUser = async (user) => {
  await user.update({ token: null });
  return true;
};
