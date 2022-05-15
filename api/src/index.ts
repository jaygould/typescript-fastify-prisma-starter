import fastify from "fastify";
import fastifySensible from "@fastify/sensible";
import fastifyCors from "@fastify/cors";
import authPassword from "./routes/auth-password";

const server = fastify();

// Plugins
server.register(fastifySensible);
server.register(fastifyCors, { origin: true });

// Routes
server.register(authPassword, { prefix: "v1" });

// Server
server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
