# PicTrove

A modern, full-stack event photo management platform that leverages face recognition to organize and deliver event photos to attendees automatically. Built with a Python Flask backend and a Next.js/React frontend, PicTrove supports multiple user roles (admin, cameraman, attendee) and integrates with MongoDB and AWS S3 for robust storage and scalability.

---

## Features

- **User Roles:** Admin, Cameraman, Attendee, each with tailored dashboards and permissions.
- **Authentication:** Secure registration and login with hashed passwords and selfie upload for attendees.
- **Photo Upload & Organization:** Cameramen upload event photos, which are automatically organized per attendee using face recognition.
- **Cloud Storage:** All photos and selfies are stored securely in AWS S3.
- **Personal Galleries:** Attendees can view and download their organized event photos.
- **Admin Tools:** Manage users, roles, and monitor uploads.
- **Modern UI:** Responsive, accessible interface built with Next.js, Tailwind CSS, and Headless UI.

---

## Tech Stack

- **Backend:** Python, Flask, Flask-CORS, pymongo, boto3, face_recognition, Pillow
- **Frontend:** Next.js (React), Tailwind CSS, Headless UI, next-auth, axios
- **Database:** MongoDB
- **Cloud Storage:** AWS S3

---

## Directory Structure

```
pixtrove/
│
├── PixTrove-backend/      # Flask backend API
│   ├── app.py             # Main backend application
│   ├── requirements.txt   # Backend dependencies
│   ├── .env               # Backend environment variables
│   └── ...                # Uploads, selfies, reference_photos, etc.
│
├── PixTrove-frontend/     # Next.js frontend
│   ├── pages/             # Next.js pages/routes
│   ├── components/        # React UI components
│   ├── styles/            # Tailwind CSS styles
│   ├── .env.example       # Frontend env example
│   └── ...
│
├── organised_photos/      # (Optional) Local output directory
├── README.md              # Project documentation
└── ...
```

---

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- MongoDB instance (local or remote)
- AWS S3 bucket & credentials

### 1. Backend Setup

```bash
cd PixTrove-backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
```

- Create a `.env` file (see below for required variables).
- Start the backend:

```bash
python app.py
```

### 2. Frontend Setup

```bash
cd ../PixTrove-frontend
npm install
```

- Copy `.env.example` to `.env` and set variables as needed.
- Start the frontend:

```bash
npm run dev
```

- The frontend will run at `http://localhost:3000` by default.

---

## Environment Variables

### Backend (`PixTrove-backend/.env`)
```
MONGO_URI=mongodb://localhost:27017/
MONGO_DB=pixtrove
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_DEFAULT_REGION=ap-south-1
S3_BUCKET=your_s3_bucket_name
```

### Frontend (`PixTrove-frontend/.env`)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
# ...other variables as needed
```

---

## Usage

1. **Register** as an attendee (with selfie) or cameraman/admin.
2. **Cameraman** uploads event photos via the dashboard.
3. **Admin** manages users and roles.
4. **Attendees** view and download their organized photos from their gallery.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE) (or specify your preferred license)

---

## Acknowledgements

- [Flask](https://flask.palletsprojects.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [face_recognition](https://github.com/ageitgey/face_recognition)
- [AWS S3](https://aws.amazon.com/s3/)
