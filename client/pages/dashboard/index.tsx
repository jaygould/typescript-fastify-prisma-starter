import React, { FC, useState } from "react";
import Button, { ButtonTypeEnum } from "../../components/Button";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import withAuthentication from "../../services/with-authentication";
import Link from "next/link";

type Props = {
  name: string;
};

const Dashboard: FC<Props> = ({ name }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const router = useRouter();

  return (
    <>
      <h2>Dashboard</h2>
      <p>Welcome, {name}</p>

      <div className="mb-5">
        <Link href="/dashboard/users">
          <a className="underline">Users</a>
        </Link>
      </div>

      <div className="mb-5">
        <Button
          text="Log out"
          type={ButtonTypeEnum.onClick}
          onClick={() => {
            removeCookie("jwt");
            router.push("/");
          }}
        />
      </div>
    </>
  );
};

export const getServerSideProps = withAuthentication((context, props) => {
  return {
    props: {
      name: props.name,
    },
  };
});

export default Dashboard;
