const contactsOperations = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.getListContacts();
      console.log(contacts);
      break;

    case "get":
      const contactById = await contactsOperations.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} doesn ton exist`);
      }
      console.log(contactById);
      break;

    case "add":
      const addedContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(addedContact);
      break;

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with id=${id} does not exist`);
      }
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
