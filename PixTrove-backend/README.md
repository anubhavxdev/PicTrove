# PixTrove Backend

A Flask backend for PixTrove, an event photo organizer with face recognition, role-based access, and selfie onboarding.

---

## Cloud Services
- This backend uses **Amazon S3** for photo and file storage.
- Other AWS services may also be used for future enhancements or integrations.

---

## Features
- User registration with role (attendee/cameraman/admin) and selfie upload
- User login (returns role and selfie path)
- Admin: List users, change roles
- Cameraman: Upload event photos
- Attendee: View their organized photos
- All endpoints CORS-enabled for frontend integration

---

## Setup Instructions

### 1. Create and activate a virtual environment (recommended)
```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

### 2. Install dependencies
```bash
pip install flask flask-cors werkzeug face_recognition
```
- You may also need to install system dependencies for `face_recognition` (see their docs for platform-specific instructions).

### 3. Run the backend
```bash
python app.py
```
- The server will start on `http://localhost:5000`

### 4. Directory Structure
- `uploads/` — Temporary event photo uploads
- `reference_photos/` — Reference images for face matching
- `organised_photos/` — Output folders for each matched attendee
- `selfies/` — Selfie images for attendee profiles
- `users.db` — SQLite database for users

---

## API Endpoints
- `POST /register` — Register user (with role and optional selfie)
- `POST /login` — Login, returns user info
- `GET /users` — List all users (admin)
- `POST /users/<id>/role` — Change user role (admin)
- `POST /event_upload` — Cameraman uploads event photos
- `POST /organize_photos` — Run face recognition and organize photos
- `GET /my_photos/<attendee_name>` — List attendee's organized photos
- `GET /organized/<attendee_name>/<filename>` — Serve organized photo
- `GET /selfies/<filename>` — Serve attendee selfie

---

## Notes
- Reference photos must be placed in `reference_photos/` and named after the attendee (e.g., `john.png`).
- The backend must be running for the frontend to function.
- For production, secure endpoints and use HTTPS.

---

## For help, see the main PixTrove documentation or contact the maintainer.
