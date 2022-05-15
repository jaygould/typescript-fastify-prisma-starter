import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import GlobalMessage from "../components/GlobalMessage";

interface IRegisterFields {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFields>({
    defaultValues: { emailAddress: "", password: "" },
  });
  const [message, setMessage] = useState(null);

  const onSubmit: SubmitHandler<IRegisterFields> = ({
    firstName,
    lastName,
    emailAddress,
    password,
  }) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        firstName,
        lastName,
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName", {
            required: true,
          })}
        />

        <input
          {...register("lastName", {
            required: true,
          })}
        />

        <input
          {...register("emailAddress", {
            required: true,
          })}
        />
        {errors.emailAddress?.type === "required" &&
          "Email address is required"}

        <input
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
          })}
        />
        {errors.password?.message}

        <input type="submit" />
      </form>

      <Link href={"/"}>
        <a>Login</a>
      </Link>

      <GlobalMessage
        message={message?.text}
        onClose={() => setMessage(null)}
        isOpen={message && message.type && message.text}
      />
    </>
  );
}

export default RegisterPage;
