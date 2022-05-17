import { Authentication } from "../services/Authentication";
import { AuthenticationToken } from "../services/AuthenticationToken";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ILoginBody, IRegisterBody, IValidateBody } from "../types/user.types";

type IRegisterRequest = FastifyRequest<{
  Body: IRegisterBody;
}>;

type ILoginRequest = FastifyRequest<{
  Body: ILoginBody;
}>;

type IValidateRequest = FastifyRequest<{
  Body: IValidateBody;
}>;

async function routes(fastify: FastifyInstance) {
  fastify.post(
    "/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["firstName", "lastName", "email", "password"],
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6, maxLength: 36 },
          },
        },
      },
    },
    async (request: IRegisterRequest, reply: FastifyReply) => {
      const { firstName, lastName, email, password } = request.body;

      try {
        const auth = new Authentication();
        await auth.createUser({ firstName, lastName, email, password });

        return reply.send({
          message: "Success.",
        });
      } catch (e: any) {
        return reply.code(400).send({ message: e?.message });
      }
    }
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6, maxLength: 36 },
          },
        },
      },
    },
    async (request: ILoginRequest, reply: FastifyReply) => {
      const { email, password } = request.body;

      try {
        const auth = new Authentication();
        const { authToken } = await auth.loginUser({
          email,
          password,
        });

        return reply.send({
          message: "Success.",
          jwt: authToken,
        });
      } catch (e: any) {
        return reply.code(400).send({ message: e?.message });
      }
    }
  );

  fastify.post(
    "/validate",
    {
      schema: {
        body: {
          type: "object",
          required: ["token"],
          properties: {
            token: { type: "string" },
          },
        },
      },
    },
    async (request: IValidateRequest, reply: FastifyReply) => {
      const { token } = request.body;

      try {
        const authToken = new AuthenticationToken(token);

        // If token is invalid, error will be thrown to the catch
        const decodedToken = await authToken.validateToken();

        return reply.send({
          ...(decodedToken?.firstName && decodedToken?.lastName
            ? { ...decodedToken }
            : null),
        });
      } catch (e: any) {
        return reply.code(400).send({ message: e?.message });
      }
    }
  );
}

export default routes;
