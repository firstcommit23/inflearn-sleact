import { useCallback } from 'react';
import io from 'socket.io-client';

const apiUrl = 'http://localhaost:3095';
const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useSocket = (workspace?: string) => {
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) return [undefined, disconnect];

  sockets[workspace] = io.connect(`${apiUrl}/ws-${workspace}`);

  return [sockets[workspace], disconnect];
};

export default useSocket;
