import fastify from "fastify";
import fastifySensible from "fastify-sensible";
import authPassword from "./routes/auth-password";

const server = fastify();

server.register(fastifySensible);

server.register(authPassword);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
