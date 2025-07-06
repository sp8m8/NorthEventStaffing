
// client/src/components/staff-timesheet-form.tsx

import React, { useState } from 'react';
import { useTimesheets } from '../hooks/use-timesheets';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Timesheet } from '../../../shared/jazz-models';

interface StaffTimesheetFormProps {
  currentUserId: string;
  onSuccess?: () => void;
}

export const StaffTimesheetForm: React.FC<StaffTimesheetFormProps> = ({
  currentUserId,
  onSuccess,
}) => {
  const { submitTimesheet, loading, error } = useTimesheets(currentUserId, 'staff');

  const [eventId, setEventId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakDurationMinutes, setBreakDurationMinutes] = useState(30);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventId || !date || !startTime || !endTime) {
      alert('Please fill in all required fields.');
      return;
    }

    const newTimesheetData: Omit<Timesheet, 'id' | 'status' | 'submittedAt' | 'hoursWorked'> = {
      staffId: currentUserId,
      eventId,
      date,
      startTime,
      endTime,
      breakDurationMinutes,
    };

    await submitTimesheet(newTimesheetData);

    if (!error) {
      // Clear form on success
      setEventId('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setBreakDurationMinutes(30);
      onSuccess?.();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Submit Timesheet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="eventId">Event ID</Label>
            <Input
              id="eventId"
              type="text"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
            <Input
              id="breakDuration"
              type="number"
              value={breakDurationMinutes}
              onChange={(e) => setBreakDurationMinutes(Number(e.target.value))}
              min="0"
            />
          </div>
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Timesheet'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
