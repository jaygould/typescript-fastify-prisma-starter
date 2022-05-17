import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import Button, { ButtonTypeEnum } from "../components/Button";
import GlobalMessage from "../components/GlobalMessage";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

interface ILoginFields {
  emailAddress: string;
  password: string;
}

interface ILoginResponse {
  message: string;
  jwt: string;
}

function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFields>({
    defaultValues: { emailAddress: "", password: "" },
  });
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["jwt"]);

  const onSubmit: SubmitHandler<ILoginFields> = ({
    emailAddress,
    password,
  }) => {
    axios
      .post<ILoginResponse>(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email: emailAddress,
        password,
      })
      .then((response) => {
        setMessage({ type: "success", text: response?.data?.message });
        setCookie("jwt", response.data.jwt, { path: "/" });
        router.push("/dashboard");
      })
      .catch((error) => {
        setMessage({ type: "error", text: error?.response?.data?.message });
      });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <input
          placeholder="Email address"
          type="text"
          {...register("emailAddress", {
            required: true,
          })}
        />

        <input
          placeholder="Password"
          type="password"
          {...register("password", {
            required: true,
          })}
        />

        <Button
          type={ButtonTypeEnum.submit}
          text={"Login"}
          color={"bg-blue-600"}
        ></Button>
      </form>

      <Button
        text={"Register"}
        link={"/register"}
        color={"bg-green-700"}
      ></Button>

      <GlobalMessage
        message={message?.text}
        onClose={() => setMessage(null)}
        isOpen={message && message.type && message.text}
      />
    </>
  );
}

export default HomePage;
