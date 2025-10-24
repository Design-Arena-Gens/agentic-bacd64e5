import type { NextApiRequest } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import { Server as IOServer } from 'socket.io';
import dataStore from '../../lib/store';
import type { RealtimeEvent } from '../../types';

type SocketServer = HTTPServer & {
  io?: IOServer;
};

type SocketWithServer = NetSocket & {
  server: SocketServer;
};

type NextApiResponseServerIO = {
  socket: SocketWithServer;
} & {
  end: (data?: any) => void;
};

const registerRealtimeBridge = (io: IOServer) => {
  const handler = (event: RealtimeEvent) => {
    io.emit('event', event);
  };
  dataStore.onRealtime(handler);
};

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    const io = new IOServer(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*'
      }
    });

    registerRealtimeBridge(io);
    res.socket.server.io = io;
  }
  res.end();
}
