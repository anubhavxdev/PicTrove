# Use python 3.9 slim image for a balance of size and compatibility
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies required for dlib and face_recognition
# CMake and g++ are strictly required to build dlib
RUN apt-get update && apt-get install -y \
    cmake \
    g++ \
    make \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
# This step might take a few minutes because dlib needs to compile
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the Flask port
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]