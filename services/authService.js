import bcrypt from "bcrypt";
import User from "./../db/models/User.js";
import { httpError } from "./../helpers/httpError.js";
import { createToken } from "./../helpers/jwt.js";
import gravatar from "gravatar";
import fs from "node:fs/promises";
import path from "node:path";
import { STATIC_FOLDER_NAME, UPLOAD_AVATARS } from "./../consts/constans.js";

const avatarDir = path.resolve(STATIC_FOLDER_NAME, UPLOAD_AVATARS);

/**
 * Find user by ID
 *
 * @param {*} where
 * @returns
 */
export const findUser = (where) => User.findOne({ where });

/**
 * Generate avatar
 *
 * @param {*} email
 * @returns
 */
export const makeAvatar = async (email) => {
  const avatarUrl = await gravatar.url(
    email,
    {
      s: "200",
      r: "pg",
      d: "identicon",
    },
    true
  );
  return avatarUrl;
};

/**
 * Register
 *
 * @param {*} payload
 * @returns
 */
export const registerUser = async (payload) => {
  const hashpass = await bcrypt.hash(payload.password, 10);
  const avatarURL = await makeAvatar(payload.email);
  return User.create({ ...payload, password: hashpass, avatarURL });
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
 * Avatar
 *
 * @param {*} user
 * @returns
 */
export const avatarUser = async (owner, fileinfo) => {
  let avatarURL = null;
  if (fileinfo) {
    const newPath = path.join(avatarDir, fileinfo.filename);
    await fs.rename(fileinfo.path, newPath);
    avatarURL = path.join(UPLOAD_AVATARS, fileinfo.filename); // path without "public" from path
  }

  const user = await findUser({ id: owner });
  await user.update({ avatarURL });
  return avatarURL;
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
