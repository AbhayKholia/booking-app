# 1. Base image
FROM node:20

# 2. Working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy app source
COPY . .

# 5. Build app
RUN npm run build

# 6. Serve build folder using simple static server
RUN npm install -g serve

# 7. Expose port
EXPOSE 5173

# 8. Start app
CMD ["serve", "-s", "dist", "-l", "5173"]
