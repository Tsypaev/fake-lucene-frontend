# base image
FROM node:9.6.1

# set working directory
WORKDIR /usr/src/app

COPY . ./

RUN npm install --production

EXPOSE 3000

# start app
CMD ["npm", "start"]`§