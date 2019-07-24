# FROM node:8 AS node

# RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# WORKDIR /home/node/app

# USER node

# COPY --chown=node:node dist .

FROM nginx

COPY dist /usr/share/nginx/html/
COPY docker/nginx-conf/ /etc/nginx/conf.d/

EXPOSE 80