FROM node:lts-alpine AS builder

WORKDIR /builder

COPY package.json {{ lockFile }} ./

RUN apk update && apk add --no-cache git

RUN {{ installationCommand }}

COPY . .

RUN node ace build --prod --client {{ client }}

FROM node:lts-alpine

ENV NODE_ENV=production
ENV PORT=80
ENV HOST=0.0.0.0

WORKDIR /app

RUN apk update && apk add --no-cache git tini

COPY --from=builder /builder/build/package.json /builder/build/{{ lockFile }} ./

RUN {{ installationCommand }} --production

COPY --from=builder /builder/build /app

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
