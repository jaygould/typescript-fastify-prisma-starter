import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import Button, { ButtonTypeEnum } from "../components/Button";
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
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <input
          type="text"
          {...register("firstName", {
            required: true,
          })}
        />

        <input
          type="text"
          {...register("lastName", {
            required: true,
          })}
        />

        <input
          type="text"
          {...register("emailAddress", {
            required: true,
          })}
        />
        {errors.emailAddress?.type === "required" &&
          "Email address is required"}

        <input
          type="text"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
          })}
        />
        {errors.password?.message}

        <Button
          type={ButtonTypeEnum.submit}
          text={"Register"}
          color={"bg-blue-600"}
        ></Button>
      </form>

      <Button text={"Login"} link={"/"} color={"bg-green-700"}></Button>

      <GlobalMessage
        message={message?.text}
        onClose={() => setMessage(null)}
        isOpen={message && message.type && message.text}
      />
    </>
  );
}

export default RegisterPage;
