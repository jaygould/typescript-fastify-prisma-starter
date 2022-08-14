import { FC } from "react";
import * as ReactDOM from "react-dom";
import Button, { ButtonTypeEnum } from "./Button";
import { TMerge, IMessage, IModalControls } from "../types/index";

const GlobalMessage: FC<TMerge<IMessage, IModalControls>> = ({
  text,
  onClose,
  isOpen,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="absolute top-0 left-0 right-0 p-3 bg-black/70 shadow flex items-center justify-center">
      <span className="text-white mr-4">{text}</span>
      <Button
        type={ButtonTypeEnum.onClick}
        onClick={() => onClose()}
        text={"x"}
        className="py-1 px-3 self-center rounded-lg"
      ></Button>
    </div>,
    document.body
  );
};

export default GlobalMessage;
