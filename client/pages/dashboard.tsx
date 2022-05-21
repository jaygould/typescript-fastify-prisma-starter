import React, { FC, useState } from "react";
import Button, { ButtonTypeEnum } from "../components/Button";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import withAuthentication from "../services/with-authentication";

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

      <Button
        text="Log out"
        type={ButtonTypeEnum.onClick}
        onClick={() => {
          removeCookie("jwt");
          router.push("/");
        }}
      />
    </>
  );
};

export const getServerSideProps = withAuthentication(async (context, props) => {
  return {
    props: {
      name: props.name,
    },
  };
});

export default Dashboard;
