
// client/src/components/admin-payroll-interface.tsx

import React, { useState, useMemo } from 'react';
import { useTimesheets } from '../hooks/use-timesheets';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { PayrollRun, Timesheet } from '../../../shared/jazz-models';

interface AdminPayrollInterfaceProps {
  currentUserId: string;
}

// Mock function to get user name from ID (re-used)
const getUserName = (userId: string): string => {
  switch (userId) {
    case 'client-001': return 'Alice Client';
    case 'manager-001': return 'Bob Manager';
    case 'staff-001': return 'Charlie Staff';
    case 'client-002': return 'David Client';
    case 'manager-002': return 'Eve Manager';
    case 'staff-002': return 'Frank Staff';
    case 'admin-001': return 'Grace Admin';
    default: return `User ${userId}`;
  }
};

// Mock Jazz data for PayrollRun (conceptual)
const mockPayrollRuns: Record<string, PayrollRun> = {};

export const AdminPayrollInterface: React.FC<AdminPayrollInterfaceProps> = ({
  currentUserId,
}) => {
  const { timesheets, loading, error } = useTimesheets(currentUserId, 'admin');
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>(Object.values(mockPayrollRuns));
  const [processing, setProcessing] = useState(false);
  const [payrollError, setPayrollError] = useState<string | null>(null);

  const approvedTimesheets = useMemo(() => {
    return timesheets.filter(ts => ts.status === 'approved');
  }, [timesheets]);

  const calculatePayroll = (): { staffId: string; totalHours: number; totalPay: number }[] => {
    const staffPayroll: Record<string, { totalHours: number; totalPay: number }> = {};
    const HOURLY_RATE = 25; // Example hourly rate

    approvedTimesheets.forEach(ts => {
      if (!staffPayroll[ts.staffId]) {
        staffPayroll[ts.staffId] = { totalHours: 0, totalPay: 0 };
      }
      staffPayroll[ts.staffId].totalHours += ts.hoursWorked;
      staffPayroll[ts.staffId].totalPay += ts.hoursWorked * HOURLY_RATE;
    });

    return Object.entries(staffPayroll).map(([staffId, data]) => ({
      staffId,
      totalHours: parseFloat(data.totalHours.toFixed(2)),
      totalPay: parseFloat(data.totalPay.toFixed(2)),
    }));
  };

  const handleRunPayroll = async () => {
    setProcessing(true);
    setPayrollError(null);
    try {
      if (approvedTimesheets.length === 0) {
        throw new Error('No approved timesheets to process.');
      }

      const payrollSummary = calculatePayroll();
      const totalAmountPaid = payrollSummary.reduce((sum, p) => sum + p.totalPay, 0);
      const processedTimesheetIds = approvedTimesheets.map(ts => ts.id);

      const newPayrollRun: PayrollRun = {
        id: `payroll-run-${Date.now()}`,
        runDate: new Date().toISOString().split('T')[0],
        status: 'completed',
        totalAmountPaid: parseFloat(totalAmountPaid.toFixed(2)),
        processedTimesheetIds,
        notes: `Processed ${approvedTimesheets.length} timesheets for a total of $${totalAmountPaid.toFixed(2)}.`,
      };

      // In a real Jazz app, you would create the PayrollRun document:
      // await jazz.createDocument('payrollRuns', newPayrollRun);

      mockPayrollRuns[newPayrollRun.id] = newPayrollRun; // Update mock data
      setPayrollRuns(prev => [...prev, newPayrollRun]);

      // Optionally, update processed timesheets status to 'paid' or similar in a real app
      // For this simulation, we just log the payroll run.

      alert('Payroll run completed successfully!');
    } catch (err: any) {
      setPayrollError(err.message || 'Failed to run payroll.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading timesheets for payroll...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  const payrollSummary = calculatePayroll();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Admin Payroll Interface</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-4">Approved Timesheets for Payroll ({approvedTimesheets.length})</h3>
        {approvedTimesheets.length === 0 ? (
          <p className="text-gray-500">No approved timesheets available for payroll processing.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timesheet ID</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Event ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hours Worked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedTimesheets.map((ts) => (
                <TableRow key={ts.id}>
                  <TableCell>{ts.id}</TableCell>
                  <TableCell>{getUserName(ts.staffId)}</TableCell>
                  <TableCell>{ts.eventId}</TableCell>
                  <TableCell>{ts.date}</TableCell>
                  <TableCell>{ts.hoursWorked}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <h3 className="text-xl font-semibold mt-8 mb-4">Payroll Summary</h3>
        {payrollSummary.length === 0 ? (
          <p className="text-gray-500">No payroll data to display.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Total Pay (Est.)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollSummary.map((summary, index) => (
                <TableRow key={index}>
                  <TableCell>{getUserName(summary.staffId)}</TableCell>
                  <TableCell>{summary.totalHours}</TableCell>
                  <TableCell>${summary.totalPay.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {payrollError && <p className="text-red-500 text-sm mt-4">Error: {payrollError}</p>}
        <Button onClick={handleRunPayroll} className="mt-4 w-full" disabled={processing || approvedTimesheets.length === 0}>
          {processing ? 'Processing...' : 'Run Payroll'}
        </Button>

        <h3 className="text-xl font-semibold mt-8 mb-4">Past Payroll Runs ({payrollRuns.length})</h3>
        {payrollRuns.length === 0 ? (
          <p className="text-gray-500">No past payroll runs.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Run ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Paid</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollRuns.map((run) => (
                <TableRow key={run.id}>
                  <TableCell>{run.id}</TableCell>
                  <TableCell>{run.runDate}</TableCell>
                  <TableCell>{run.status}</TableCell>
                  <TableCell>${run.totalAmountPaid.toFixed(2)}</TableCell>
                  <TableCell>{run.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
