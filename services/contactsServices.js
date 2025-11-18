import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";

// contacts.js
const contactsPath = path.resolve("db", "contacts.json");

/**
 * Update contact db
 *
 * @param {*} res
 */
export async function updateContacts(res) {
  await fs.writeFile(contactsPath, JSON.stringify(res), null, 2);
}

/**
 * List contact
 *
 * @returns
 */
export async function listContacts() {
  const res = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(res);
}

/**
 * Get contact by id
 *
 * @param {*} contactId
 * @returns
 */
export async function getContactById(contactId) {
  const res = await listContacts();
  const res1 = res.find((item) => item.id === contactId);
  return res1 ?? null;
}

/**
 * Remove contact
 *
 * @param {*} contactId
 * @returns
 */
export async function removeContact(contactId) {
  const res = await listContacts();
  const idx = res.findIndex((index) => index.id === contactId);
  if (idx === -1) return null;
  const [res2] = res.splice(idx, 1);
  await updateContacts(res);
  return res2;
}

/**
 * Add contact
 *
 * @param {*} payload
 * @returns
 */
export async function addContact(payload) {
  const res = await listContacts();
  const newOne = {
    ...payload,
    id: nanoid(),
  };
  res.push(newOne);
  await updateContacts(res);
  return newOne;
}

/**
 * Update contact by ID
 *
 * @param {*} contactId
 * @param {*} updateData
 * @returns
 */
export async function updateContactById(contactId, updateData) {
  const res = await listContacts();
  const idx = res.findIndex((idx) => idx.id === contactId);
  if (idx === -1) return null;
  res[idx] = { ...res[idx], ...updateData };
  await updateContacts(res);
  return res[idx];
}
