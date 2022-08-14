export type TMerge<T, V> = Omit<T, Extract<keyof T, keyof V>> & V;

type TMessage = { message: string };
export type TPostResponse<T = {}> = TMessage & T;
export type TGetResponse<T = {}> = {} & T;

export interface IMessage {
  type: "success" | "error";
  text: string;
}

export interface IModalControls {
  onClose: () => void;
  isOpen: boolean;
}
