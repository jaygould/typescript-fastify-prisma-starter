import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

const authPlugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
};

export default fp(authPlugin, "4.x");
