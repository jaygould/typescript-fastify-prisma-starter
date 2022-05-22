import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { User } from "../services/User";

import { IUserLogin, IUserName, IUserTokens } from "../ts-types/user.types";
import { getErrors } from "../ts-helpers/errors";

type IGetUsersRequest = FastifyRequest<{}>;

async function routes(fastify: FastifyInstance) {
  fastify.get(
    `/users`,
    {
      onRequest: [fastify.authenticate],
    },
    async (request: IGetUsersRequest, reply: FastifyReply) => {
      try {
        const user = new User();
        const users = await user.getUsers();

        return reply.send({
          users,
        });
      } catch (e: unknown) {
        const error = getErrors(e);
        return reply.code(400).send({ message: error });
      }
    }
  );
}

export default routes;
