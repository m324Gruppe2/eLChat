import { WebSocket } from 'ws';

export interface User {
  id: string;
  name: string;
  ws?: WebSocket;
}

export interface Message {
  type: 'newUser' | 'message' | 'activeUsers' | 'typing';
  user?: User;
  users?: User[];
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface DebouncedFunction extends Function {
  cancel: () => void;
  flush: () => void;
}
