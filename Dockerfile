# Backend (Django)
FROM python:3.11.6-slim AS backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    python3-dev\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app/backend

# Install dependencies
COPY BackEnd/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY BackEnd .

# Frontend (React)
FROM node:18.13-slim AS frontend

# Set work directory
WORKDIR /app/frontend

# Install dependencies
COPY FrontEnd/package.json FrontEnd/yarn.lock ./
RUN yarn install

# Copy frontend code
COPY FrontEnd .

# Build frontend

RUN yarn build

# Production
FROM backend AS production

# Collect static files
RUN python manage.py collectstatic --noinput

# Copy frontend build files
COPY --from=frontend /app/frontend/dist /app/backend/static

# Expose port
EXPOSE 8000

# Run server
CMD ["python", "manage.py", "runserver"]
