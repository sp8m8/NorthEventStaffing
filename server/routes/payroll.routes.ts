import { Router } from "express";
import {
  generatePayrollReport,
  processPayroll,
} from "../controllers/payroll.controller";
import { protect, restrictTo } from "../middleware/auth";

const router = Router();

router
  .route("/report")
  .post(protect, restrictTo("admin"), generatePayrollReport);
router.route("/process").post(protect, restrictTo("admin"), processPayroll);

export default router;
