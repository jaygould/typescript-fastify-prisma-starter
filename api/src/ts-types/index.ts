import { User } from "@prisma/client";

export type PickRename<T, K extends keyof T, R extends PropertyKey> = Omit<
  T,
  K
> & {
  [P in R]: T[K];
};

export type TTokenValues = Pick<User, "id" | "firstName" | "lastName">;
// First the PickRename changes the user "id" field to "userId" so it matches our terminology,
// i.e. it's saved in the DB as "id" but we refer to it in types/objects as "userId",
// then we Pick THAT value out so we can use as an optional value
export type TUserId = Pick<PickRename<User, "id", "userId">, "userId">;
