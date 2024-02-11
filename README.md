## Installation

```bash
$ pnpm install
```

## Running the app

```bash
$ docker compose up -d database # Run the database with docker compose -> see .env.example
$ npx prisma migrate reset # Reset the database and rerun the migrations
$ pnpm run start # Start the aplication
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
