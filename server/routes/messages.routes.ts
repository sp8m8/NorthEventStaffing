import { Router } from "express";
import {
  getMessages,
  createMessage,
} from "../controllers/messages.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.route("/:eventId").get(protect, getMessages);
router.route("/").post(protect, createMessage);

export default router;
