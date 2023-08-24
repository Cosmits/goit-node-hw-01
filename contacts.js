import fs from 'fs/promises';
import path from 'path';
import { v1 as uuidv1 } from 'uuid';

const contactsPath = path.resolve('db', 'contacts.json');


async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}


async function getContactById(contactId) {
  const allContacts = await listContacts()

  const foundContact = allContacts.find(
    contact => contact.id === contactId);

  return foundContact || null;
}


async function addContact(name, email, phone) {
  if (!name && !email && !phone) return null;

  const id = uuidv1();
  const newContact = { id, name, email, phone };

  const allContacts = await listContacts();

  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact || null;
}


async function updateContact(contactId, name, email, phone) {
  const allContacts = await listContacts();
  const indexEl = allContacts.findIndex(el => el.id === contactId);

  if (indexEl === -1) return null;

  const newContact = { contactId, name, email, phone };

  allContacts.splice(indexEl, 1, newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}


async function removeContact(contactId) {
  const allContacts = await listContacts();
  const indexEl = allContacts.findIndex(el => el.id === contactId);

  if (indexEl === -1) return null;

  const [result] = allContacts.splice(indexEl, 1);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}


export default {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
