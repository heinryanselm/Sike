import { useEffect } from "react";
import { useSocket } from "../../hooks/useSocket";
import { PlayerList } from "./PlayerList";
import { Button } from "../ui/Button";
import { GameState } from "../../types/game";

interface GameLobbyProps {
  gameState: GameState;
  isCreator: boolean;
}

export const GameLobby = ({ gameState, isCreator }: GameLobbyProps) => {
  const socket = useSocket();

  const handleStartGame = () => {
    socket.emit("start_game", { roomId: gameState.roomId });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Game Lobby</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Room ID:</h3>
          <code className="bg-gray-100 px-4 py-2 rounded">
            {gameState.roomId}
          </code>
        </div>
        <PlayerList players={gameState.players} />
        {isCreator && (
          <Button
            onClick={handleStartGame}
            className="mt-6 w-full"
            disabled={gameState.players.length < 2}
          >
            Start Game
          </Button>
        )}
      </div>
    </div>
  );
};
