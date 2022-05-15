# TypeScript, Fastify and Prisma starter

## Tech used in this starter

- TypeScript: for strong type safety
- Fastify: for a lightning fast API framework
- Prisma: for modern, readable database management
- Docker: for bringing everything together

## Starting

- `docker-compose up --build` will start the container _and_ run Prisma migrate and generate scripts.

## Notes

- Postgres volume does not mount correctly with error message `could not open file "pg_wal/000000010000000000000001": No such file or directory` when running `docker-compose up`. The fix is to keep the volume as `./db/data/postgres:/var/lib/postgresql` instead of the "correct" way of `./db/data/postgres:/var/lib/postgresql/data`, which should correctly mount the data for re-use across containers. The problem seems to be a M1 issue - https://github.com/docker/for-mac/issues/6243, and disabling "virtiofs" in Docker Desktop DOES fix the issue, but this option should be enabled.
