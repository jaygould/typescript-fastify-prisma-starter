import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import GlobalMessage from "../components/GlobalMessage";

interface ILoginFields {
  emailAddress: string;
  password: string;
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

  const onSubmit: SubmitHandler<ILoginFields> = ({
    emailAddress,
    password,
  }) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email: emailAddress,
        password,
      })
      .then((response) => {
        setMessage({ type: "success", text: response?.data?.message });
      })
      .catch((error) => {
        setMessage({ type: "error", text: error?.response?.data?.message });
      });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("emailAddress", {
            required: true,
          })}
        />

        <input
          {...register("password", {
            required: true,
          })}
        />

        <input type="submit" />
      </form>

      <Link href={"/register"}>
        <a>Register</a>
      </Link>

      <GlobalMessage
        message={message?.text}
        onClose={() => setMessage(null)}
        isOpen={message && message.type && message.text}
      />
    </>
  );
}

export default HomePage;
