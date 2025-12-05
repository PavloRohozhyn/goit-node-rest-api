import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactController.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactFavoriteSchema,
} from "./../schemas/contactsSchema.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "./../middlewares/authenticate.js";

const contactRouter = express.Router();

contactRouter.get("/", [authenticate], getAllContacts);
contactRouter.get("/:id", [authenticate], getOneContact);
contactRouter.delete("/:id", [authenticate], deleteContact);
contactRouter.post(
  "/",
  [authenticate],
  validateBody(createContactSchema),
  createContact
);
contactRouter.put(
  "/:id",
  [authenticate],
  validateBody(updateContactSchema),
  updateContact
);
contactRouter.patch(
  "/:id/favorite",
  [authenticate],
  validateBody(updateContactFavoriteSchema),
  updateStatusContact
);

export default contactRouter;
