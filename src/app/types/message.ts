export type MessageType = 'success' | 'error';

export interface Message {
  text: string;
  type: MessageType;
}
