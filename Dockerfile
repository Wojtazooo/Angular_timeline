### STAGE 1:BUILD ###
FROM node:20-alpine AS build

# Set the working directory to the project root
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project and build it
COPY . .
RUN npm run build --prod

### STAGE 2:RUN ###
FROM nginx:latest

# Copy the compiled Angular app to the nginx directory
COPY --from=build /app/dist/angular-timeline/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
