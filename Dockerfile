# syntax=docker/dockerfile:1

# use latest nginx image
# FROM arcanemachine/images:nginx
FROM nginx

# copy website content to folder
ADD ./html/ /usr/share/nginx/html

EXPOSE 8081:80
