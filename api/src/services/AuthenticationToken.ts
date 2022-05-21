import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";

import config from "../config";
import { IUser, IUserName } from "../ts-types/user.types";

class AuthenticationToken {
  public db: any;
  public token: string | undefined;
  public refreshToken: string | undefined;

  constructor(token?: string, refreshToken?: string) {
    const prisma = new PrismaClient();
    this.db = prisma;

    if (token) {
      this.token = token;
    }
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
  }

  createToken(user: IUser) {
    this.token = jwt.sign(_.omit(user, "password"), config.authSecret, {
      expiresIn: "90d",
    });
  }

  async createRefreshToken(userEmail: string) {
    this.refreshToken = jwt.sign({ type: "refresh" }, config.authSecret, {
      expiresIn: "90d", // 1 hour
    });

    await this.saveRefreshToken(userEmail);

    return;
  }

  private saveRefreshToken(userEmail: string) {
    return this.db.user.update({
      where: {
        email: userEmail,
      },
      data: {
        refreshToken: this.refreshToken,
      },
    });
  }

  validateRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("There is no refresh token to check.");
    }

    return new Promise((res, rej) => {
      jwt.verify(refreshToken, config.authSecret, async (err: any) => {
        if (err) {
          rej({
            code: "refreshExpired",
            message: "Refresh token expired - session ended.",
          });
        } else {
          try {
            const user = await this.db.users.findUnique({
              where: {
                refreshToken,
              },
            });
            res(user);
          } catch (e) {
            rej(e);
          }
        }
      });
    });
  }

  async validateToken() {
    return new Promise<IUserName>((res, rej) => {
      if (!this.token) {
        throw new Error("No auth token.");
      }

      jwt.verify(this.token, config.authSecret, (err: any, decoded: any) => {
        if (err) {
          rej();
        } else {
          res({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
          });
        }
      });
    });
  }
}

export { AuthenticationToken };
