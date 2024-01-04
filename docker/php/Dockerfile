FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt update && \
    apt install -y \
        libpq-dev \
        iputils-ping \
        vim \
        git \
        zip \
        unzip \
        libzip-dev \
    && docker-php-ext-install pdo_pgsql \
    && docker-php-ext-install zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-source delete

RUN pecl install xdebug

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer self-update --2

RUN usermod -u 1000 www-data

RUN mkdir /var/www/.composer/
RUN echo "alias artisan=\"php artisan\"" > /var/www/.bashrc
RUN echo "alias ll=\"ls -la\"" >> /var/www/.bashrc
RUN chown -R www-data /var/www

USER www-data

RUN rm -rf /var/cache/apk/*

CMD ["php-fpm", "--nodaemonize"]
