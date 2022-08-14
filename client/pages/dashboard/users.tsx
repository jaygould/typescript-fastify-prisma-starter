import React, { FC } from "react";
import withAuthentication from "../../services/with-authentication";
import axios from "axios";
import UserList from "../../components/UserList";

type User = {
  email: string;
  isThisUser: boolean;
};

type AllUsers = Omit<User, "isThisUser">;

type Props = {
  users: AllUsers[];
  thisUser: User[];
};

const Users: FC<Props> = ({ thisUser, users }) => {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="mb-10">
        <p>Users:</p>
        <UserList<AllUsers>
          users={users}
          render={(user) => {
            return <div>{user.email}</div>;
          }}
        ></UserList>
      </div>

      <div className="mb-10">
        <p>Current user:</p>
        <UserList<User>
          users={thisUser}
          render={(user: User) => {
            return <div>{user.email}</div>;
          }}
        ></UserList>
      </div>
    </>
  );
};

export const getServerSideProps = withAuthentication(
  async (context, props, jwt) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NETWORK_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return {
        props: {
          thisUser: response.data.users
            .filter((user) => user.id === props.id)
            .map((user) => {
              return {
                ...user,
                isThisUser: true,
              };
            }),
          users: response.data.users,
        },
      };
    } catch (e) {
      return {
        props: {
          users: [],
        },
      };
    }
  }
);

export default Users;
