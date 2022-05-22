import React, { FC } from "react";

type Props<T> = {
  users: T[];
  render: (user: T) => React.ReactNode;
};

const UserList: FC<any> = <T,>({ users, render }: Props<T>) => {
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
