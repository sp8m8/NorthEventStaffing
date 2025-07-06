
// client/src/components/manager-timesheet-dashboard.tsx

import React, { useState } from 'react';
import { useTimesheets } from '../hooks/use-timesheets';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Textarea } from './ui/textarea';
import { Timesheet } from '../../../shared/jazz-models';

interface ManagerTimesheetDashboardProps {
  currentUserId: string;
}

// Mock function to get user name from ID (re-used from communication-channel.tsx)
const getUserName = (userId: string): string => {
  switch (userId) {
    case 'client-001': return 'Alice Client';
    case 'manager-001': return 'Bob Manager';
    case 'staff-001': return 'Charlie Staff';
    case 'client-002': return 'David Client';
    case 'manager-002': return 'Eve Manager';
    case 'staff-002': return 'Frank Staff';
    default: return `User ${userId}`;
  }
};

export const ManagerTimesheetDashboard: React.FC<ManagerTimesheetDashboardProps> = ({
  currentUserId,
}) => {
  const { timesheets, reviewTimesheet, loading, error } = useTimesheets(currentUserId, 'manager');
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleReview = async (timesheetId: string, status: 'approved' | 'rejected') => {
    const managerNotes = notes[timesheetId] || '';
    await reviewTimesheet(timesheetId, status, managerNotes);
    setNotes(prev => { delete prev[timesheetId]; return { ...prev }; }); // Clear notes after review
  };

  if (loading) {
    return <div className="text-center py-4">Loading timesheets...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  const pendingTimesheets = timesheets.filter(ts => ts.status === 'pending');
  const reviewedTimesheets = timesheets.filter(ts => ts.status !== 'pending');

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Manager Timesheet Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-4">Pending Timesheets ({pendingTimesheets.length})</h3>
        {pendingTimesheets.length === 0 ? (
          <p className="text-gray-500">No pending timesheets to review.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff</TableHead>
                <TableHead>Event ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTimesheets.map((ts) => (
                <TableRow key={ts.id}>
                  <TableCell>{getUserName(ts.staffId)}</TableCell>
                  <TableCell>{ts.eventId}</TableCell>
                  <TableCell>{ts.date}</TableCell>
                  <TableCell>{ts.hoursWorked}</TableCell>
                  <TableCell>{ts.status}</TableCell>
                  <TableCell>
                    <Textarea
                      placeholder="Add notes..."
                      value={notes[ts.id] || ''}
                      onChange={(e) => setNotes(prev => ({ ...prev, [ts.id]: e.target.value }))}
                      className="min-w-[150px]"
                    />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" onClick={() => handleReview(ts.id, 'approved')}>Approve</Button>
                    <Button variant="destructive" onClick={() => handleReview(ts.id, 'rejected')}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <h3 className="text-xl font-semibold mt-8 mb-4">Reviewed Timesheets ({reviewedTimesheets.length})</h3>
        {reviewedTimesheets.length === 0 ? (
          <p className="text-gray-500">No timesheets have been reviewed yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff</TableHead>
                <TableHead>Event ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reviewed By</TableHead>
                <TableHead>Reviewed At</TableHead>
                <TableHead>Manager Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviewedTimesheets.map((ts) => (
                <TableRow key={ts.id}>
                  <TableCell>{getUserName(ts.staffId)}</TableCell>
                  <TableCell>{ts.eventId}</TableCell>
                  <TableCell>{ts.date}</TableCell>
                  <TableCell>{ts.hoursWorked}</TableCell>
                  <TableCell>{ts.status}</TableCell>
                  <TableCell>{ts.reviewedByManagerId ? getUserName(ts.reviewedByManagerId) : 'N/A'}</TableCell>
                  <TableCell>{ts.reviewedAt ? new Date(ts.reviewedAt).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>{ts.managerNotes || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
