import express from "express";
import {
  allList,
  create,
  read,
  remove,
  update,
} from "../controllers/category.controller";

const router = express.Router();

router.post("/v1/contact-information", create);
router.patch("/v1/contact-information/:slug", update);
router.delete("/v1/contact-information", remove);
router.get("/v1/contact-information", allList);
router.get("/v1/contact-information/:slug", read);

export default router;
