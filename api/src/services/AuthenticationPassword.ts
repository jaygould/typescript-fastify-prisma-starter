import * as bcrypt from "bcryptjs";
import * as _ from "lodash";

/**
 * Class to abstract the higher level authentication logic away from
 * specific user actions
 */
class AuthenticationPassword {
  public password: string;
  public hashedPassword: string;

  constructor(password, hashedPassword) {
    this.password = password;
    this.hashedPassword = hashedPassword;
  }

  public hashPassword() {
    return this.password && bcrypt.hashSync(this.password.trim(), 12);
  }

  public compareHashedPassword() {
    return new Promise<void>((res, rej) => {
      bcrypt.compare(
        this.password,
        this.hashedPassword,
        (err: Error, success: boolean) => {
          if (err) {
            rej(
              new Error(
                "The has been an unexpected error, please try again later"
              )
            );
          }
          if (!success) {
            rej(new Error("Your password is incorrect."));
          } else {
            res();
          }
        }
      );
    });
  }
}

export { AuthenticationPassword };
