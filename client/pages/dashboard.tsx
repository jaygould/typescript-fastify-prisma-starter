import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Button, { ButtonTypeEnum } from "../components/Button";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

function Dashboard({ name }) {
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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jwt = context?.req?.cookies?.jwt;
  if (!jwt) {
    return {
      redirect: {
        destination: "/?e=no-token",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NETWORK_API_URL}/validate`,
      {
        token: jwt,
      }
    );

    return {
      props: {
        name: `${response.data.firstName} ${response.data.lastName}`,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/?e=invalid-token",
        permanent: false,
      },
    };
  }
};

export default Dashboard;
