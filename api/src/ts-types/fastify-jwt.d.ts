import "@fastify/jwt";
import { TTokenValues } from ".";
import { FastifyRequest } from "fastify";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number }; // payload type is used for signing and verifying
    user: TTokenValues; // user type is return type of `request.user` object
  }
}
