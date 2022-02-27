# syntax=docker/dockerfile:1

# use latest nginx image
FROM nginx

# copy website content to folder
ADD ${HTML_PATH} /usr/share/nginx/

EXPOSE ${CONTAINER_PORT_INTERNAL}:80
