import React, { FunctionComponent } from "react";
import Link from "next/link";

enum ButtonTypeEnum {
  href = "href",
  submit = "submit",
  onClick = "onClick",
}

type Props = {
  text: string;
  type?: ButtonTypeEnum;
  link?: string;
  onClick?: () => void;
  color?: string;
  className?: string;
};

const Button: FunctionComponent<Props> = ({
  text,
  link,
  type = "href",
  onClick,
  color,
  className,
}) => {
  const btnClass = `inline-block py-3 px-5 border-0 text-sm text-white rounded ${
    color ? color : "bg-orange-700"
  } ${className}`;

  return type === "href" ? (
    <Link href={link}>
      <a className={btnClass}>{text}</a>
    </Link>
  ) : type === "submit" ? (
    <input className={btnClass} type="submit" value={text} />
  ) : type === "onClick" ? (
    <button className={btnClass} onClick={() => onClick()}>
      {text}
    </button>
  ) : null;
};

export default Button;
export { ButtonTypeEnum };
