
// client/src/hooks/use-timesheets.ts

import { useState, useEffect, useCallback } from 'react';
import { Timesheet } from '../../../shared/jazz-models';

/**
 * Mock Jazz data for demonstration purposes.
 * In a real application, this would come from Jazz's real-time sync.
 */
const mockTimesheets: Record<string, Timesheet> = {
  'timesheet-001': {
    id: 'timesheet-001',
    staffId: 'staff-001',
    eventId: 'event-123',
    date: '2025-07-01',
    startTime: '09:00',
    endTime: '17:00',
    breakDurationMinutes: 30,
    hoursWorked: 7.5,
    status: 'pending',
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  'timesheet-002': {
    id: 'timesheet-002',
    staffId: 'staff-001',
    eventId: 'event-456',
    date: '2025-07-02',
    startTime: '10:00',
    endTime: '18:00',
    breakDurationMinutes: 60,
    hoursWorked: 7.0,
    status: 'approved',
    submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    reviewedByManagerId: 'manager-001',
    reviewedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  'timesheet-003': {
    id: 'timesheet-003',
    staffId: 'staff-002',
    eventId: 'event-123',
    date: '2025-07-01',
    startTime: '08:00',
    endTime: '16:00',
    breakDurationMinutes: 45,
    hoursWorked: 7.25,
    status: 'pending',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
  },
};

/**
 * A custom hook to manage timesheet operations.
 * Simulates Jazz's real-time synchronization for timesheets.
 *
 * @param currentUserId The ID of the currently authenticated user.
 * @param currentUserRole The role of the currently authenticated user.
 * @returns An object containing timesheets, and functions for submission and review.
 */
export const useTimesheets = (currentUserId: string, currentUserRole: 'staff' | 'manager' | 'admin') => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching timesheets based on user role
  useEffect(() => {
    setLoading(true);
    setError(null);
    let filteredTimesheets: Timesheet[] = [];

    if (currentUserRole === 'staff') {
      filteredTimesheets = Object.values(mockTimesheets).filter(ts => ts.staffId === currentUserId);
    } else if (currentUserRole === 'manager' || currentUserRole === 'admin') {
      // Managers/Admins can see all timesheets (or timesheets for their assigned events/staff)
      // For simplicity, managers/admins see all mock timesheets here.
      filteredTimesheets = Object.values(mockTimesheets);
    }
    setTimesheets(filteredTimesheets);
    setLoading(false);

    // In a real Jazz app, you would subscribe to a collection or group for real-time updates:
    // const unsubscribe = jazz.getCollection('timesheets').subscribe((latestTimesheets) => {
    //   setTimesheets(latestTimesheets.filter(...));
    // });
    // return () => unsubscribe();
  }, [currentUserId, currentUserRole]);

  /**
   * Simulates a staff member submitting a new timesheet.
   * In a real Jazz app, this would involve creating a new Timesheet document.
   *
   * @param newTimesheetData The data for the new timesheet.
   */
  const submitTimesheet = useCallback(async (newTimesheetData: Omit<Timesheet, 'id' | 'status' | 'submittedAt' | 'hoursWorked'>) => {
    setLoading(true);
    setError(null);
    try {
      if (currentUserRole !== 'staff') {
        throw new Error('Only staff can submit timesheets.');
      }

      const hoursWorked = (new Date(`2000/01/01 ${newTimesheetData.endTime}`).getTime() -
                           new Date(`2000/01/01 ${newTimesheetData.startTime}`).getTime()) / (1000 * 60 * 60) -
                          (newTimesheetData.breakDurationMinutes / 60);

      const newTimesheet: Timesheet = {
        id: `timesheet-${Date.now()}`,
        ...newTimesheetData,
        hoursWorked: parseFloat(hoursWorked.toFixed(2)),
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };

      // In a real Jazz app, you would create the document:
      // await jazz.createDocument('timesheets', newTimesheet);

      mockTimesheets[newTimesheet.id] = newTimesheet; // Update mock data
      setTimesheets(prev => [...prev, newTimesheet]);
    } catch (err: any) {
      setError(err.message || 'Failed to submit timesheet.');
    } finally {
      setLoading(false);
    }
  }, [currentUserRole]);

  /**
   * Simulates a manager/admin reviewing a timesheet.
   * In a real Jazz app, this would involve updating the Timesheet document.
   *
   * @param timesheetId The ID of the timesheet to review.
   * @param status The new status ('approved' or 'rejected').
   * @param managerNotes Optional notes from the manager.
   */
  const reviewTimesheet = useCallback(async (timesheetId: string, status: 'approved' | 'rejected', managerNotes?: string) => {
    setLoading(true);
    setError(null);
    try {
      if (currentUserRole !== 'manager' && currentUserRole !== 'admin') {
        throw new Error('Only managers or admins can review timesheets.');
      }

      const timesheetToUpdate = mockTimesheets[timesheetId];
      if (!timesheetToUpdate) {
        throw new Error('Timesheet not found.');
      }

      const updatedTimesheet: Timesheet = {
        ...timesheetToUpdate,
        status,
        reviewedByManagerId: currentUserId,
        reviewedAt: new Date().toISOString(),
        managerNotes: managerNotes || '',
      };

      // In a real Jazz app, you would update the document:
      // await jazz.updateDocument(timesheetId, updatedTimesheet);

      mockTimesheets[timesheetId] = updatedTimesheet; // Update mock data
      setTimesheets(prev => prev.map(ts => ts.id === timesheetId ? updatedTimesheet : ts));
    } catch (err: any) {
      setError(err.message || 'Failed to review timesheet.');
    } finally {
      setLoading(false);
    }
  }, [currentUserId, currentUserRole]);

  return { timesheets, submitTimesheet, reviewTimesheet, loading, error };
};
