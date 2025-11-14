import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";

// contacts.js
const contactsPath = path.resolve("db", "contacts.json");

export async function updateContacts(res) {
  await fs.writeFile(contactsPath, JSON.stringify(res), null, 2);
}

export async function listContacts() {
  const res = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(res);
}

export async function getContactById(contactId) {
  const res = await listContacts();
  const res1 = res.find((item) => item.id === contactId);
  return res1 ?? null;
}

export async function removeContact(contactId) {
  const res = await listContacts();
  const idx = res.findIndex((index) => index.id === contactId);
  if (idx === -1) return null;
  const [res2] = res.splice(idx, 1);
  await updateContacts(res);
  return res2;
}

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
