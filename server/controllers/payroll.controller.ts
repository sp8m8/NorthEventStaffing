import { Request, Response } from "express";
import * as payrollService from "../services/payroll.service";

export const generatePayrollReport = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;
  const report = await payrollService.generatePayrollReport(startDate, endDate);
  res.json(report);
};

export const processPayroll = async (req: Request, res: Response) => {
  const { payPeriodStart, payPeriodEnd } = req.body;
  const result = await payrollService.processPayroll(
    payPeriodStart,
    payPeriodEnd,
  );
  res.json(result);
};
