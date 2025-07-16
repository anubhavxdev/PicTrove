# PixTrove Frontend

A modern, dark-themed Next.js frontend for PixTrove: event photo organization with face recognition, admin dashboard, and role-based access.

---

## Features
- Authentication (NextAuth.js) with role-based dashboard (Admin, Cameraman, Attendee)
- Attendee selfie upload during registration
- Cameraman event photo upload
- Admin dashboard for user/role management
- Attendee photo gallery
- Fully dark UI with PixTrove branding

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Backend Connection
- The frontend expects the backend Flask server to run at `http://localhost:5000`.
- Make sure to start the backend (`PixTrove-backend/app.py`) before using the frontend.

### 3. Run the frontend
```bash
npm run dev
```
- The app will be available at `http://localhost:3000`

---

## Usage
- **Register:** Create an account as attendee (with selfie) or cameraman.
- **Login:** Access your dashboard based on your role.
- **Admin:** Assign roles and manage users from the admin dashboard.
- **Cameraman:** Upload event photos for face recognition.
- **Attendee:** View your selfie and organized event photos.

---

## Directory Structure
- `/pages` — Main routes (login, register, dashboard, admin, etc.)
- `/components` — Reusable UI components (Navbar, UserTable, etc.)
- `/styles` — Tailwind CSS setup

---

## Notes
- Requires the PixTrove backend to be running for full functionality.
- For production, configure environment variables and secure API endpoints.
- For help, see the backend README or contact the maintainer.

---

**Project: PixTrove**
