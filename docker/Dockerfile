FROM node:18

RUN mkdir /srv/front

RUN chown -R node:node /usr/local/lib/node_modules \
    && chown -R node:node /usr/local/bin \
    && chown -R node:node /srv/front

USER node:node

WORKDIR /srv/front
COPY package.json .
RUN npm i


EXPOSE 3000

# CMD ["npm", "run", "start:dev"]