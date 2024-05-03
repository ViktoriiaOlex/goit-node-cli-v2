import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts/contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        console.table(await listContacts());
        break;
      case "get":
        console.log(await getContactById(id));
        break;
      case "remove":
        console.log(await removeContact(id));
        break;
      case "add":
        console.log(await addContact(name, email, phone));
        break;
      default:
        console.warn("Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
}

invokeAction(options);
