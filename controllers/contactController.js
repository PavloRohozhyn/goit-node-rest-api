import * as service from "./../services/contactService.js";
import { httpError } from "./../helpers/httpError.js";

/**
 * Get All contacts
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllContacts = async (req, res) => {
  const owner = req.user.id; //get owner id
  const data = await service.listContacts(owner);
  return res.json(data);
};

/**
 * Create contact
 *
 * @param {*} req
 * @param {*} res
 */
export const createContact = async (req, res) => {
  const owner = req.user.id; //get owner id
  const data = await service.addContact(req.body, owner);
  res.status(201).json(data);
};

/**
 * Get contacts by ID
 *
 * @param {*} req
 * @param {*} res
 */
export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.id; //get owner id
  const data = await service.getContactById(id, owner);
  if (!data) {
    throw httpError(404, `Not Found`);
  }
  res.json(data);
};

/**
 * Delete contact by ID
 *
 * @param {*} req
 * @param {*} res
 */
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.id;
  const data = await service.removeContact(id, owner);
  if (!data) {
    throw httpError(404, `Not Found`);
  }
  res.json(data);
};

/**
 * Update contact by ID
 *
 * @param {*} req
 * @param {*} res
 */
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.id;
  if (!Object.keys(req.body).length) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }
  const data = await service.updateContactById(id, req.body, owner);
  if (!data) {
    throw httpError(404, `Not Found`);
  }
  res.json(data);
};

/**
 * Update status contact
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.id;
  if (Object.keys(req.body).length !== 1) {
    return res.status(400).json({
      message: "Body must have only one field and the field has name: favorite",
    });
  }
  const data = await service.updateStatusContact(id, req.body, owner);
  if (!data) {
    throw httpError(404, `Not Found`);
  }
  res.json(data);
};
