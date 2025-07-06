import { Router } from "express";
import {
  createTimesheet,
  getTimesheet,
  updateTimesheetStatus,
} from "../controllers/timesheets.controller";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router.route("/").post(protect, restrictTo("staff"), createTimesheet);
router.route("/:id").get(protect, getTimesheet);
router
  .route("/:id/status")
  .patch(protect, restrictTo("manager", "admin"), updateTimesheetStatus);

export default router;
