import React from "react";

type Props<T> = {
  users: T[];
  render: (user: T) => React.ReactNode;
};

// Constrain the re-usable component to only accept a generic which has a string key, and
// string | boolean | number values/

const UserList = <T extends Record<string, string | boolean | number>>({
  users,
  render,
}: Props<T>) => {
  return (
    <div>
      {users?.length ? (
        users.map((user) => {
          return render(user);
        })
      ) : (
        <p>There are no registered users.</p>
      )}
    </div>
  );
};

export default UserList;
