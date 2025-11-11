FROM node:22-alpine

WORKDIR /src

# Copy only package files first
COPY package*.json ./

# Install nodemon
RUN npm install -g nodemon

# Install deps (optional)
# RUN npm install

# Copy source files
COPY . .

EXPOSE 9000

CMD ["npm", "run", "dev"]
