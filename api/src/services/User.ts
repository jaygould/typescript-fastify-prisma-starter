import { PrismaClient } from "@prisma/client";

class User {
  public db: PrismaClient;

  constructor() {
    const prisma = new PrismaClient();
    this.db = prisma;
  }

  getUsers() {
    return this.db.user.findMany();
  }
}

export { User };
