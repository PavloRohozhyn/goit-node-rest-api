import nodemailer from "nodemailer";
import "dotenv/config";

const { GMAIL_EMAIL, GMAIL_PASS } = process.env;

const nodemailerConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (payload) => {
  const email = { ...payload, from: GMAIL_EMAIL };
  return transport.sendMail(email);
};

export default sendEmail;
