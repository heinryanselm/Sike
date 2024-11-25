import { useState, useEffect } from "react";
import { useSocket } from "../../hooks/useSocket";
import { GameState } from "../../types/game";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface GameRoomProps {
  gameState: GameState;
  username: string;
}

export const GameRoom = ({ gameState, username }: GameRoomProps) => {
  const socket = useSocket();
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");

  useEffect(() => {
    if (gameState.questions.length > 0) {
      setCurrentQuestion(gameState.questions[gameState.currentRound]);
    }
  }, [gameState.currentRound, gameState.questions]);

  const handleSubmitAnswer = () => {
    socket.emit("submit_answer", {
      roomId: gameState.roomId,
      username,
      answer,
    });
    setAnswer("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Round {gameState.currentRound + 1}
          </h2>
          <p className="text-lg">{currentQuestion}</p>
        </div>

        <div className="space-y-4">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer..."
          />
          <Button
            onClick={handleSubmitAnswer}
            className="w-full"
            disabled={!answer}
          >
            Submit Answer
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Players:</h3>
          <div className="grid grid-cols-2 gap-4">
            {gameState.players.map((player) => (
              <div
                key={player.username}
                className="bg-gray-50 p-3 rounded flex justify-between items-center"
              >
                <span>{player.username}</span>
                <span className="font-medium">{player.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
