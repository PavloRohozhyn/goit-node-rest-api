import Contact from "./../db/models/Contact.js";
import { httpError } from "./../helpers/httpError.js";

/**
 * List contact
 *
 * @returns
 */
export const listContacts = () => Contact.findAll();

/**
 * Add contact
 *
 * @param {*} payload
 * @returns
 */
export const addContact = (payload) => Contact.create(payload);

/**
 * Get contact by id
 *
 * @param {*} contactId
 * @returns
 */
export const getContactById = (contactId) => Contact.findByPk(contactId);

/**
 * Remove contact
 *
 * @param {*} contactId
 * @returns
 */
export const removeContact = async (contactId) => {
  const deleteContact = await getContactById(contactId);
  if (!deleteContact) return null;
  await deleteContact.destroy();
  return deleteContact;
};

/**
 * Update contact by ID
 *
 * @param {*} contactId
 * @param {*} updateData
 * @returns
 */
export const updateContactById = async (contactId, updateData) => {
  const updateContact = await getContactById(contactId);
  if (!updateContact) return null;
  await updateContact.update(updateData);
  return updateContact;
};

/**
 * Update status constanc
 *
 * @param {*} contactId
 * @param {*} updateStatusData
 * @returns
 */
export const updateStatusContact = async (contactId, updateStatusData) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  await contact.update(updateStatusData);
  return contact;
};
