# Next.js, TypeScript, Fastify and Prisma starter

## Tech used in this starter

- Next.js: for SSR and the newest React features
- TypeScript: for strong type safety
- Fastify: for a lightning fast API framework
- Prisma: for modern, readable database management
- Docker: for bringing everything together

## Starting

- `docker-compose up --build` will start the front end and back end servers inside Docker containers, run Prisma migrate and generate scripts.

## Notable points

- Front end - forms handled using React Hook Form
- Front end - requests to accompanying API in separate Docker container using Axios
- Front end - global success/error messaging implemented using React Portals
- Back end - custom authentication using JWT's

## Notes

- Postgres volume does not mount correctly with error message `could not open file "pg_wal/000000010000000000000001": No such file or directory` when running `docker-compose up`. The fix is to keep the volume as `./db/data/postgres:/var/lib/postgresql` instead of the "correct" way of `./db/data/postgres:/var/lib/postgresql/data`, which should correctly mount the data for re-use across containers. The problem seems to be a M1 issue - https://github.com/docker/for-mac/issues/6243, and disabling "virtiofs" in Docker Desktop DOES fix the issue, but this option should be enabled.
