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

const contactRouter = express.Router();

contactRouter.get("/", getAllContacts);
contactRouter.get("/:id", getOneContact);
contactRouter.delete("/:id", deleteContact);
contactRouter.post("/", validateBody(createContactSchema), createContact);
contactRouter.put("/:id", validateBody(updateContactSchema), updateContact);
contactRouter.patch(
  "/:id/favorite",
  validateBody(updateContactFavoriteSchema),
  updateStatusContact
);

export default contactRouter;
