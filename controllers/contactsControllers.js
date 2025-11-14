import { listContacts } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const data = await listContacts();
  console.log(data);
  return res.status(200).json(data);
};

export const getOneContact = (req, res) => {};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
