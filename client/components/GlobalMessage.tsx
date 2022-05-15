import * as ReactDOM from "react-dom";

export default function GlobalMessage({ message, onClose, isOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div>
      <span>{message}</span>
      <button onClick={() => onClose()}>Close</button>
    </div>,
    document.body
  );
}
