FROM node:20-alpine as base

WORKDIR /app
RUN apk add --no-cache tzdata eudev tini make gcc g++ python3 linux-headers

FROM base as build

COPY package*.json ./
RUN npm ci --no-audit --no-optional --no-update-notifier
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM base as release

COPY package*.json LICENSE ./
RUN npm ci --omit=dev --no-audit --no-optional --no-update-notifier && \
    # Serialport needs to be rebuild for Alpine https://serialport.io/docs/9.x.x/guide-installation#alpine-linux
    npm rebuild --build-from-source
COPY --from=build /app/dist ./dist
RUN mkdir /app/data
ENV NODE_ENV production
ENTRYPOINT ["/sbin/tini", "--", "npm", "start"]
