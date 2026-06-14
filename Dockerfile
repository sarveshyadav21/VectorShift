# Dockerfile
# Multi-stage build to package frontend and backend together

# --- Stage 1: Build the React frontend ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy dependencies list and install
COPY frontend/package*.json ./
RUN npm install

# Copy source code and compile production static assets
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Build the FastAPI backend and mount frontend ---
FROM python:3.10-slim
WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ ./backend

# Copy the compiled static frontend files from Stage 1
COPY --from=frontend-builder /app/frontend/build ./frontend/build

EXPOSE 8000

# Start Uvicorn to serve the unified app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
