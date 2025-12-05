import Contact from "../db/models/Contact.js";

/**
 * List contact
 *
 * @returns
 */
export const listContacts = (owner) =>
  Contact.findAll({
    where: {
      owner,
    },
  });

/**
 * Add contact
 *
 * @param {*} payload
 * @returns
 */
export const addContact = (payload, owner) =>
  Contact.findOrCreate({
    where: { owner },
    payload,
  });

/**
 * Get contact by id
 *
 * @param {*} contactId
 * @returns
 */
export const getContactById = (contactId, owner) =>
  Contact.findByPk({ id: contactId, owner });

/**
 * Remove contact
 *
 * @param {*} contactId
 * @returns
 */
export const removeContact = async (contactId, owner) => {
  const deleteContact = await getContactById(contactId, owner);
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
export const updateContactById = async (contactId, updateData, owner) => {
  const updateContact = await getContactById(contactId, owner);
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
export const updateStatusContact = async (
  contactId,
  updateStatusData,
  owner
) => {
  const contact = await getContactById(contactId, owner);
  if (!contact) return null;
  await contact.update(updateStatusData);
  return contact;
};
