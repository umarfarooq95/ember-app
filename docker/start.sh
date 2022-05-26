#!/bin/sh

sh /etc/nginx/conf.d/create_nginx_env.sh > /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"



sleep 100000
