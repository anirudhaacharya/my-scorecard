# Use an Ubuntu base image
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Install system packages
RUN apt-get update && \
    apt-get install -y \
      mysql-server \
      libmysqlclient-dev \
      python3 \
      python3-pip \
      nodejs \
      npm \
      nginx \
      supervisor \
      curl && \
    rm -rf /var/lib/apt/lists/*

# --------------------
# Setup the Django Backend
# --------------------
# Create a directory for the backend
WORKDIR /app/backend

# Copy the backend requirements and install Python dependencies
COPY backend/requirements.txt .
RUN pip3 install --upgrade pip && pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY backend/ .

# --------------------
# Build the React Frontend
# --------------------
WORKDIR /app/frontend

# Copy package files and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend code and build it
COPY frontend/ .
RUN npm run build

# Copy the built frontend to Nginx's default html folder
RUN rm -rf /var/www/html/* && cp -r /app/frontend/build/* /var/www/html/

# --------------------
# Configure Nginx
# --------------------
# Remove the default config and copy our custom configuration
COPY nginx.conf /etc/nginx/sites-available/default

# --------------------
# Configure Supervisor
# --------------------
# Copy the Supervisor config file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports for Nginx (frontend) and Django (backend)
EXPOSE 80 8000

# Start Supervisor (which in turn starts MySQL, Django, and Nginx)
CMD ["/usr/bin/supervisord", "-n"]
