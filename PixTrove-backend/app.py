import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
# import sqlite3 (removed for MongoDB)
import face_recognition
import shutil
import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
from urllib.parse import urljoin
from pymongo import MongoClient

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
MONGO_DB = os.getenv('MONGO_DB', 'pixtrove')
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
users_col = db['users']

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_DEFAULT_REGION = os.getenv('AWS_DEFAULT_REGION', 'ap-south-1')
S3_BUCKET = os.getenv('S3_BUCKET')

s3 = boto3.client('s3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION
)

def upload_file_to_s3(file_obj, filename, folder):
    key = f"{folder}/{filename}"
    try:
        s3.upload_fileobj(file_obj, S3_BUCKET, key)
        url = f"https://{S3_BUCKET}.s3.{AWS_DEFAULT_REGION}.amazonaws.com/{key}"
        return url
    except NoCredentialsError:
        return None

UPLOAD_FOLDER = './uploads'
REFERENCE_DIR = './reference_photos'
ORGANISED_DIR = './organised_photos'
SELFIE_DIR = './selfies'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SELFIE_FOLDER'] = SELFIE_DIR

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(REFERENCE_DIR, exist_ok=True)
os.makedirs(ORGANISED_DIR, exist_ok=True)
os.makedirs(SELFIE_DIR, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# def get_db(): (removed for MongoDB)
#     conn = sqlite3.connect('users.db')
#     conn.row_factory = sqlite3.Row
#     return conn

def init_db():
    conn = get_db()
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        selfie_path TEXT
    )''')
    conn.commit()
    conn.close()



@app.route('/register', methods=['POST'])
def register():
    email = request.form.get('email')
    password = request.form.get('password')
    role = request.form.get('role')
    selfie = request.files.get('selfie')
    if not email or not password or not role:
        return jsonify({'error': 'Missing fields'}), 400
    if users_col.find_one({'email': email}):
        return jsonify({'error': 'User already exists'}), 409
    selfie_path = None
    if role == 'attendee' and selfie and allowed_file(selfie.filename):
        filename = secure_filename(email + '_selfie.' + selfie.filename.rsplit('.', 1)[1].lower())
        selfie_url = upload_file_to_s3(selfie, filename, 'selfies')
        if not selfie_url:
            return jsonify({'error': 'Failed to upload selfie to S3'}), 500
        selfie_path = selfie_url
    hashed_pw = generate_password_hash(password)
    user_doc = {
        'email': email,
        'password': hashed_pw,
        'role': role,
        'selfie_path': selfie_path
    }
    users_col.insert_one(user_doc)
    return jsonify({'message': 'Registration successful', 'selfie_url': selfie_path})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = users_col.find_one({'email': email})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401
    return jsonify({'email': user['email'], 'role': user['role'], 'selfie_path': user.get('selfie_path')})

@app.route('/users', methods=['GET'])
def get_users():
    users = []
    for user in users_col.find():
        users.append({
            'id': str(user.get('_id')),
            'email': user.get('email'),
            'role': user.get('role'),
            'selfie_path': user.get('selfie_path')
        })
    return jsonify(users)

from bson import ObjectId

@app.route('/users/<user_id>/role', methods=['POST'])
def update_role(user_id):
    data = request.get_json()
    new_role = data.get('role')
    result = users_col.update_one({'_id': ObjectId(user_id)}, {'$set': {'role': new_role}})
    if result.modified_count == 1:
        return jsonify({'message': 'Role updated'})
    else:
        return jsonify({'error': 'User not found or role unchanged'}), 404

@app.route('/selfies/<filename>')
def get_selfie(filename):
    return send_from_directory(SELFIE_DIR, filename)

import face_recognition

# Endpoint: Cameraman uploads event photos
@app.route('/event_upload', methods=['POST'])
def event_upload():
    files = request.files.getlist('photos')
    uploaded = []
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            s3_url = upload_file_to_s3(file, filename, 'event_uploads')
            if s3_url:
                uploaded.append(s3_url)
    return jsonify({'uploaded': uploaded})

# Helper: Organize a single photo

def organize_photo(file_path):
    try:
        uploaded_image = face_recognition.load_image_file(file_path)
        uploaded_face_encodings = face_recognition.face_encodings(uploaded_image)
        if not uploaded_face_encodings:
            return None
        uploaded_face_encoding = uploaded_face_encodings[0]
        for reference_image_name in os.listdir(REFERENCE_DIR):
            reference_image_path = os.path.join(REFERENCE_DIR, reference_image_name)
            if not reference_image_name.lower().endswith(('png', 'jpg', 'jpeg')):
                continue
            reference_image = face_recognition.load_image_file(reference_image_path)
            reference_face_encodings = face_recognition.face_encodings(reference_image)
            if not reference_face_encodings:
                continue
            reference_face_encoding = reference_face_encodings[0]
            results = face_recognition.compare_faces([reference_face_encoding], uploaded_face_encoding)
            if results[0]:
                attendee_name = reference_image_name.split('.')[0]
                s3_key = f"organized_photos/{attendee_name}/{os.path.basename(file_path)}"
                with open(file_path, 'rb') as img_file:
                    s3_url = upload_file_to_s3(img_file, os.path.basename(file_path), f"organized_photos/{attendee_name}")
                # Optionally, delete local file after upload
                os.remove(file_path)
                return {'matched_with': reference_image_name, 's3_url': s3_url, 'photo': os.path.basename(file_path)}
        return None
    except Exception as e:
        return None

# Endpoint: Organize all uploaded event photos
@app.route('/organize_photos', methods=['POST'])
def organize_photos():
    results = []
    for filename in os.listdir(UPLOAD_FOLDER):
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        if not os.path.isfile(file_path) or not allowed_file(filename):
            continue
        result = organize_photo(file_path)
        if result:
            results.append(result)
    return jsonify({'organized': results})

# Endpoint: Attendee views their organized photos
@app.route('/my_photos/<attendee_name>', methods=['GET'])
def my_photos(attendee_name):
    # S3 organized_photos/<attendee_name>/
    s3_prefix = f"organized_photos/{attendee_name}/"
    try:
        response = s3.list_objects_v2(Bucket=S3_BUCKET, Prefix=s3_prefix)
        photos = []
        for obj in response.get('Contents', []):
            key = obj['Key']
            if any(key.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png']):
                url = f"https://{S3_BUCKET}.s3.{AWS_DEFAULT_REGION}.amazonaws.com/{key}"
                photos.append(url)
        return jsonify({'photos': photos})
    except Exception as e:
        return jsonify({'photos': [], 'error': str(e)})

# Endpoint: Serve organized photos
@app.route('/organized/<attendee_name>/<filename>')
def serve_organized(attendee_name, filename):
    s3_key = f"organized_photos/{attendee_name}/{filename}"
    s3_url = f"https://{S3_BUCKET}.s3.{AWS_DEFAULT_REGION}.amazonaws.com/{s3_key}"
    return jsonify({'url': s3_url})

if __name__ == '__main__':
    app.run(debug=True)
