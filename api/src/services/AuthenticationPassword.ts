import * as bcrypt from "bcryptjs";
import * as _ from "lodash";

/**
 * Class to abstract the higher level authentication logic away from
 * specific user actions
 */
class AuthenticationPassword {
  public password: string;
  public hashedPassword: string | null;

  constructor(password: string, hashedPassword: string | null) {
    this.password = password;
    this.hashedPassword = hashedPassword;
  }

  public hashPassword(): string {
    return this.password && bcrypt.hashSync(this.password.trim(), 12);
  }

  public compareHashedPassword(): Promise<void> {
    return new Promise<void>((res, rej) => {
      if (!this.hashedPassword)
        return rej(
          new Error("The has been an unexpected error, please try again later")
        );

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
