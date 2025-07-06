# UI/UX Fix & Portal Integration Plan

## Overview
The current UI is left-shifted and demo/user role elements are visible on the home page, which detracts from a professional appearance. This plan outlines steps to:
- Center and modernize the layout for desktop web.
- Move demo/user role and feature elements into their respective portals.
- Ensure a clean, professional, and modern design throughout the site.

---

## Goals
- Center all main content and improve spacing for desktop.
- Remove demo and user role elements from the home page.
- Place client/staff/admin features in their respective portals (Client Portal, Staff Portal, Admin Portal).
- Achieve a visually appealing, modern, and consistent design.

---

## Steps

### 1. Audit & Refactor Layout
- Review all main layout containers (e.g., App, Home, Header, Footer).
- Use flexbox/grid and max-width constraints to center content.
- Add appropriate padding/margins for desktop.

### 2. Remove Demo/Role Elements from Home
- Identify and remove any demo, user role, or feature preview elements from the home page.
- Ensure only marketing and general info is visible on the home page.

### 3. Portal Integration
- Move client-specific features to the Client Portal page.
- Move staff-specific features to the Staff Portal page.
- Move admin/manager features to the Admin Portal (if applicable).
- Use role-based routing and authentication to control access.

### 4. UI/UX Enhancements
- Use shadcn/ui and Radix UI for consistent, modern components.
- Improve typography, spacing, and color usage.
- Add responsive breakpoints for desktop, tablet, and mobile.
- Test on multiple screen sizes.

### 5. Review & QA
- Get feedback from stakeholders.
- Test navigation and portal access for all user roles.
- Ensure no sensitive/demo elements are visible to public users.

---

## Milestones
1. Layout centering and spacing fixes
2. Home page cleanup
3. Portal feature migration
4. Responsive design QA

---

## Tech Stack
- React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI

---

## Future Enhancements
- Add theme switcher (light/dark mode)
- Add user onboarding flows for each portal
- Continuous UI/UX improvement based on user feedback
