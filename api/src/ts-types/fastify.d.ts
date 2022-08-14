import { FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    jwtVerify: () => void;
    user: IUserPayload;
  }
  interface FastifyInstance {
    authenticate: () => void;
  }
}
