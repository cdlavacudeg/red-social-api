# Red-Social API

## Running the app locally

Get running the database with postgres and redis before hand(you could use docker compose with the database and cache
sections).
Fill the .env file with the correct parameters.

### Requirements

- NodeJs
- pnpm installed

```bash
$ pnpm install
$ npx prisma generate
$ npx prisma migrate dev --name init
$ pnpm build
$ pnpm run start:prod
```

## Running the app with docker

Fill the .env file with the correct parameters.
Keep in mind the hosts for the database and the cache are different when running the app with docker, you must use the
container name.

```bash
$ docker compose build api
$ docker compose up -d # wait for all to be running
$ docker exec -it [api_container_id] sh
$ npx prisma migrate dev --name init # First migration # On the api container
```

## Prisma

- `npx prisma init` -> Init prisma
- `npx prisma help` -> Help of prisma
- `npx prisma generate` -> Generate clases to use in the app
- `npx prisma format` -> Format prisma schema file

### Migrations

- `npx prisma migrate dev --name init` -> First migration
- `npx prisma migrate dev --name initial-migration --create-only` -> [Add prisma to a project](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/add-prisma-migrate-to-a-project)
- `npx prisma migrate dev` -> Generate the migrations
- `npx prisma migrate resolve --applied {nombre_migración}` -> Mark the migration as applied
- `npx prisma db pull --schema {filepath}`
- `npx prisma db seed` -> Run Prisma seeder
- `npx prisma migrate reset` -> Reset the database data, and rerun the migrations
