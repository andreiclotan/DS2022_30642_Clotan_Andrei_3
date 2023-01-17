FROM node
 WORKDIR /app
 COPY package.json .
 RUN npm install --force
 COPY . .
 EXPOSE 3001
 CMD ["yarn", "start","-p","3001"]