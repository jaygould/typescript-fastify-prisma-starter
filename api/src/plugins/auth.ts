import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: () => void;
  }
}

const authPlugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
};

export default fp(authPlugin, "3.x");
