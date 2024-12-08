# Gunakan node versi LTS
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose port yang digunakan
EXPOSE 8080

# Command untuk menjalankan aplikasi
CMD ["npm", "start"] 