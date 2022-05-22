import React, { FC } from "react";
import withAuthentication from "../../services/with-authentication";
import axios from "axios";

// TODO: share types from server
interface IUser {
  email: string;
}

type Props = {
  users: IUser[];
};

const Users: FC<Props> = ({ users }) => {
  return (
    <>
      <h2>Dashboard</h2>

      <p>Users:</p>
      {users?.length ? (
        users.map((user) => {
          return (
            <div>
              <p>{user.email}</p>
            </div>
          );
        })
      ) : (
        <p>There are no registered users.</p>
      )}
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
