# ── Stage 1: Build the React Frontend ──
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
# Note: Using --emptyOutDir to ensure clean build
RUN npm run build

# ── Stage 2: Build the Production Server (PHP + Apache) ──
FROM php:8.2-apache

# Enable Apache mod_rewrite for .htaccess
RUN a2enmod rewrite

# Install SQLite dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite

# Set working directory
WORKDIR /var/www/html

# Copy the entire PHP application
COPY . .

# Copy the built React frontend into the root directory
# This overwrites the static index.html or adds it
COPY --from=frontend-build /app/frontend/dist/ ./

# Ensure permissions are correct for SQLite
RUN touch database.sqlite \
    && chown -R www-data:www-data /var/www/html \
    && chmod 775 /var/www/html \
    && chmod 664 /var/www/html/database.sqlite

# Cloud Run expects the server to listen on $PORT
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Start Apache
CMD ["apache2-foreground"]
