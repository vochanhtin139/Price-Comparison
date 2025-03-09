# Stage 1: Build the app
FROM node:22.14-alpine3.20 AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --force

# Copy all source files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the built assets with Nginx
FROM nginx:stable-alpine
# Copy the build output from the builder stage to Nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 81
EXPOSE 81

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
