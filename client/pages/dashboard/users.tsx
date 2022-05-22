import React, { FC } from "react";
import withAuthentication from "../../services/with-authentication";
import axios from "axios";
import UserList from "../../components/UserList";

// TODO: share types from server
interface IUser {
  email: string;
}

interface ICurrentUser extends IUser {
  isThisUser: boolean;
}

type Props = {
  users: IUser[];
  thisUser: ICurrentUser[];
};

const Users: FC<Props> = ({ thisUser, users }) => {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="mb-10">
        <p>Users:</p>
        <UserList
          users={users}
          render={(user: IUser) => {
            return <div>{user.email}</div>;
          }}
        ></UserList>
      </div>

      <div className="mb-10">
        <p>Current user:</p>
        <UserList
          users={thisUser}
          render={(user: ICurrentUser) => {
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
