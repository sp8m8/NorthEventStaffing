
// client/src/pages/admin-portal.tsx

import React, { useState } from 'react';
import { ManagerTimesheetDashboard } from '@/components/manager-timesheet-dashboard';
import { AdminPayrollInterface } from '@/components/admin-payroll-interface';

export default function AdminPortal() {
  // Mock user state for demonstration in this portal
  const [currentUser] = useState({
    id: "admin-001",
    name: "Grace Admin",
    role: "admin",
  });

  return (
    <div className="py-12">
      <title>NORTH STAFF - Admin Portal</title>
      <h1 className="text-4xl font-bold text-center mb-8">Admin Portal</h1>
      <p className="text-center mb-8">Welcome, {currentUser.name}! Manage timesheets and payroll here.</p>

      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center mb-8">Timesheet Review</h2>
        <ManagerTimesheetDashboard currentUserId={currentUser.id} />

        <h2 className="text-3xl font-bold text-center mb-8">Payroll Processing</h2>
        <AdminPayrollInterface currentUserId={currentUser.id} />
      </section>
    </div>
  );
}
