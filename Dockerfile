# Build the static Eleventy site using NodeJS
FROM node:23-alpine
WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build

# Serve the site using nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=0 /app/_site/ ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
