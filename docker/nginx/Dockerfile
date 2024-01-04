FROM jwilder/nginx-proxy

RUN apt update
RUN apt install -y \
        vim \
        iputils-ping

RUN rm /etc/nginx/conf.d/default.conf

RUN echo "upstream php-upstream { server php:9000; }" > /etc/nginx/conf.d/upstream.conf

CMD ["nginx", "-g", "daemon off;"]
