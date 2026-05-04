FROM php:8.2-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install SQLite dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Create the SQLite database file and set permissions so Apache can write to it
RUN touch database.sqlite \
    && chown -R www-data:www-data /var/www/html \
    && chmod 775 /var/www/html \
    && chmod 664 /var/www/html/database.sqlite

# Configure Apache to use port 8080 (Cloud Run default)
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Start Apache in the foreground
CMD ["apache2-foreground"]
