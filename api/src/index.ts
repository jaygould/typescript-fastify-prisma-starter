import fastify from "fastify";
import fastifySensible from "@fastify/sensible";
import fastifyCors from "@fastify/cors";
import authPlugin from "./plugins/auth";
import authPassword from "./routes/auth-password";
import users from "./routes/users";

const server = fastify();

// Plugins
server.register(fastifySensible);
server.register(fastifyCors, { origin: true });
server.register(authPlugin);

// Routes
server.register(authPassword, { prefix: "v1" });
server.register(users, { prefix: "v1" });

// Server
server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
