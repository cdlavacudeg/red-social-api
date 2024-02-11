FROM alpine AS base

RUN apk add --update nodejs npm
RUN npm install -g corepack
RUN apk update && apk add --no-cache libc6-compat 
RUN corepack enable && corepack prepare pnpm@latest --activate 

COPY ["package.json","pnpm-lock.yaml","/usr/src/"]
WORKDIR /usr/src
RUN pnpm install
COPY ["prisma/schema.prisma","/usr/src/"]
RUN npx prisma generate

COPY [".","/usr/src/"]
RUN pnpm build


CMD ["node","dist/src/main.js"]
