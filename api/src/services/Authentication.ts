import {
  Prisma,
  PrismaClient,
  User,
  LoginActivity,
  ActivityType,
} from "@prisma/client";

import { AuthenticationToken } from "./AuthenticationToken";
import { AuthenticationPassword } from "./AuthenticationPassword";

interface IUserCreate
  extends Pick<User, "firstName" | "lastName" | "email" | "password"> {}

interface IUserLogin extends Pick<User, "email" | "password"> {}

class Authentication {
  public db;

  constructor() {
    const prisma = new PrismaClient();
    this.db = prisma;
  }

  async createUser({
    firstName,
    lastName,
    email,
    password,
  }: IUserCreate): Promise<User> {
    if (!email || !firstName || !lastName || !password) {
      throw new Error("You must send all register details.");
    }

    if (!this.validateEmail(email)) {
      throw new Error("Please use a valid email address.");
    }

    const userExists = await this.doesUserExist(email);

    if (userExists) {
      throw new Error("User already registered.");
    }

    const authPassword = new AuthenticationPassword(password, null);
    const newUser = await this.saveUser({
      firstName,
      lastName,
      email,
      password: authPassword.hashPassword(),
    });

    await this.logUserActivity(newUser.id, "signup");

    return newUser;
  }

  async loginUser({ email, password }: IUserLogin) {
    if (!email || !password) {
      throw new Error("You must send all login details.");
    }

    const userExists = await this.doesUserExist(email);
    if (!userExists) {
      throw new Error("No matching user.");
    }

    try {
      const authPassword = new AuthenticationPassword(
        password,
        userExists.password
      );
      await authPassword.compareHashedPassword();
    } catch (e) {
      throw e;
    }

    const token = new AuthenticationToken();
    await token.createToken({ ...userExists });
    await token.createRefreshToken(userExists.email);
    await this.logUserActivity(userExists.id, "login");

    return {
      id: userExists.id,
      token: token.token,
      refreshToken: token.refreshToken,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      email: userExists.email,
    };
  }

  logUserActivity(
    userId: number,
    activity: ActivityType
  ): Promise<LoginActivity> {
    return this.db.loginActivity.create({
      data: { userId, activityType: activity },
    });
  }

  doesUserExist(email: string): Promise<User | null> {
    const userEmailWhere: Prisma.UserWhereUniqueInput = {
      email: email,
    };

    return this.db.user.findUnique({
      where: userEmailWhere,
    });
  }

  validateEmail(email: string | number) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  saveUser({
    firstName,
    lastName,
    email,
    password,
  }: IUserCreate): Promise<User> {
    if (!email) throw new Error();

    return this.db.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });
  }
}

export { Authentication };
