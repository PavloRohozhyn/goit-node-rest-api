import bcrypt from "bcrypt";
import User from "./../db/models/User.js";
import { httpError } from "./../helpers/httpError.js";
import sendEmail from "./../helpers/mail.js";
import { createToken } from "./../helpers/jwt.js";
import gravatar from "gravatar";
import fs from "node:fs/promises";
import path from "node:path";
import { STATIC_FOLDER_NAME, UPLOAD_AVATARS } from "./../consts/constans.js";
import { nanoid } from "nanoid";

const avatarDir = path.resolve(STATIC_FOLDER_NAME, UPLOAD_AVATARS);

const { SERVER_URL } = process.env;

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
  const verificationToken = nanoid();

  await sendEmail({
    to: payload.email,
    subject: "Verify email",
    html: `<strong>Verify email</strong><br>
    <a href="${SERVER_URL}/api/auth/verify/${verificationToken}" target="_blank">click to verify</a>`,
  });

  return User.create({
    ...payload,
    password: hashpass,
    avatarURL,
    verificationToken,
  });
};

/**
 * Resent
 *
 * @param {*} payload
 * @returns
 */
export const resentEmailUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  let vtoken = user.verificationToken;
  if (!user) throw httpError(404, "User Not Found");
  if (user.verify) throw httpError(400, "Verification has already been passed");
  // paranoia
  if (!vtoken) {
    vtoken = nanoid();
    await user.update({ verificationToken: vtoken });
  }
  await sendEmail({
    to: email,
    subject: "Verify email",
    html: `<strong>Verify email (resent)</strong><br>
    <a href="${SERVER_URL}/api/auth/verify/${vtoken}" target="_blank">click to verify</a>`,
  });

  return true;
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
 * Verify email
 */
export const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ where: { verificationToken } });
  if (!user) {
    throw httpError(404, "User not found");
  }
  await user.update({ verify: true });
  return true;
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
  if (!user) throw httpError(401, "Email or password is wrong"); // auth
  if (!user.verify) throw httpError(400, "Email not verified"); // check if email is verified
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
