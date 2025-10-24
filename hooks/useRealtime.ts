'use client';

import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import type { RealtimeEvent } from '../types';

type RealtimeState = {
  socket: Socket | null;
  lastEvent?: RealtimeEvent;
  setSocket: (socket: Socket) => void;
  setLastEvent: (event: RealtimeEvent) => void;
};

const useRealtimeStore = create<RealtimeState>((set) => ({
  socket: null,
  setSocket: (socket) => set(() => ({ socket })),
  setLastEvent: (event) => set(() => ({ lastEvent: event }))
}));

export default function useRealtime() {
  const { socket, setSocket, setLastEvent } = useRealtimeStore();

  const initialize = useCallback(() => {
    if (socket) return;
    const newSocket = io({
      path: '/api/socket',
      transports: ['websocket']
    });

    newSocket.on('connect', () => {
      console.debug('[realtime] connected');
    });

    newSocket.on('event', (event: RealtimeEvent) => {
      setLastEvent(event);
    });

    setSocket(newSocket);
  }, [socket, setSocket, setLastEvent]);

  return {
    socket,
    initialize,
    lastEvent: useRealtimeStore((state) => state.lastEvent)
  };
}
