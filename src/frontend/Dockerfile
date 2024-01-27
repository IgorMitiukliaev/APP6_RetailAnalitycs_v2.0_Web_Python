FROM node:20-alpine AS builder

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install -g @angular/cli && npm install ngx-cookie --save && npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN ng build --configuration production

# nginx state for serving content
FROM nginx:alpine

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s CMD ps -elf | grep 'nginx' | grep -v grep || exit 1

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Add nginx config with fallback page and static file path
COPY nginx_config.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
