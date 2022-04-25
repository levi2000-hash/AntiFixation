FROM node:18-slim
# I chose node 18 since it is the latest LTS version. Hope it doesn't break your functionality.
# Also -slim cuts down on unnececarry dependencies on the OS. I don't think you'll have any trouble, but if you do, remove it.

WORKDIR /usr/src/app
COPY ./package.json .
RUN yarn install

COPY . .
# RUN yarn build #since you are using a react dev server, guess this is unnecessary

ENV PORT 80

CMD [ "yarn", "start" ] 