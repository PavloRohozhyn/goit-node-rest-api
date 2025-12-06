import multer from "multer";
import path from "node:path";
import { httpError } from "./../helpers/httpError.js";

/**
 * Temporary dir
 */
const tempDir = path.resolve("temp");

/**
 * Storage
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

/**
 * Limits
 */
const limits = () => {
  fileSize: 1024 * 1024 * 5;
};

/**
 * File filter
 *
 * @param {*} req
 * @param {*} file
 * @param {*} cb
 * @returns
 */
const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    return cb(httpError(400, ".exe extension not allowet"));
  }
  cb(null, true);
};

/**
 * Uplods
 */
const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
