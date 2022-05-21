import { FC } from "react";
import * as ReactDOM from "react-dom";
import Button, { ButtonTypeEnum } from "./Button";

type Props = {
  message: string;
  onClose: () => void;
  isOpen: boolean;
};

const GlobalMessage: FC<Props> = ({ message, onClose, isOpen }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="absolute top-0 left-0 right-0 p-3 bg-black/70 shadow flex items-center justify-center">
      <span className="text-white mr-4">{message}</span>
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
