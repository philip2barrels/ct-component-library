FROM node:8.16.0-jessie

EXPOSE 80
WORKDIR /src
ARG CYPRESS_INSTALL_BINARY=https://corptools-static-assets.s3-us-west-2.amazonaws.com/cypress.zip
RUN apt-get update && apt-get install -y nginx

RUN mkdir -p /run/nginx
RUN mkdir -p /src/
COPY . .

RUN apt-get install tree

RUN npm rebuild node-sass

RUN npm install

RUN npm run build && rm -rf node_modules

RUN rm -rf /var/lib/nginx/html
RUN cp -r /src/dist /var/lib/nginx/html

ENTRYPOINT [ "sh" ]
CMD [ "/src/entrypoint.sh" ]


