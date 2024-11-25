import { useState, useEffect } from "react";
import { useSocket } from "./useSocket";
import { GameState } from "../types/game";

export const useGame = (roomId: string | undefined) => {
  const socket = useSocket();
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    if (!socket || !roomId) {
      return;
    }

    const handleGameState = (state: GameState) => {
      setGameState(state);
    };

    socket.on("game_state", handleGameState);

    // Initial game state request
    socket.emit("get_game_state", { roomId });

    return () => {
      socket.off("game_state", handleGameState);
    };
  }, [socket, roomId]);

  return gameState;
};
