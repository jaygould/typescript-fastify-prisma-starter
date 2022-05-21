import { Authentication } from "../services/Authentication";
import { AuthenticationToken } from "../services/AuthenticationToken";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { IUserLogin, IUserName, IUserTokens } from "../ts-types/user.types";
import { getErrors } from "../ts-helpers/errors";

type IRegisterRequest = FastifyRequest<{
  Body: IUserLogin & IUserName;
}>;

type ILoginRequest = FastifyRequest<{
  Body: IUserLogin;
}>;

type IValidateRequest = FastifyRequest<{
  Body: IUserTokens;
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
      } catch (e: unknown) {
        const error = getErrors(e);
        return reply.code(400).send({ message: error });
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
        const { token } = await auth.loginUser({
          email,
          password,
        });

        return reply.send({
          message: "Success.",
          jwt: token,
        });
      } catch (e: unknown) {
        const error = getErrors(e);
        return reply.code(400).send({ message: error });
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
      const { token: authToken } = request.body;

      try {
        const token = new AuthenticationToken(authToken);

        // If token is invalid, error will be thrown to the catch
        const decodedToken = await token.validateToken();

        return reply.send({
          ...(decodedToken?.firstName && decodedToken?.lastName
            ? { ...decodedToken }
            : null),
        });
      } catch (e: unknown) {
        const error = getErrors(e);
        return reply.code(400).send({ message: error });
      }
    }
  );
}

export default routes;
