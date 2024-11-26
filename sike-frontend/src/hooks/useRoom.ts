import { useState, useEffect } from "react";

interface Player {
  id: string;
  name: string;
}

interface RoomData {
  players: Player[];
  roomId: string;
  rounds: number;
}
export const useRoom = (roomId: string | undefined) => {
  const [roomData, setRoomData] = useState<RoomData | null>(null);

  useEffect(() => {
    if (!roomId) return;

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`room_${roomId}`);
      if (stored) {
        setRoomData(JSON.parse(stored));
      }
    }
  }, [roomId]);

  return roomData;
};
