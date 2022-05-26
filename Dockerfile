FROM nginx:alpine

ENV NODE_ENV=docker

EXPOSE 80

USER root

COPY docker/start.sh /
COPY docker/nginx.conf /etc/nginx/
COPY docker/create_nginx_env.sh /etc/nginx/conf.d/
COPY docker/default.conf /etc/nginx/conf.d/

RUN mkdir /etc/nginx/html
COPY dist/ /etc/nginx/html/

RUN sh /etc/nginx/conf.d/ > /etc/nginx/conf.d/default.conf

CMD ["sh", "/start.sh"]

