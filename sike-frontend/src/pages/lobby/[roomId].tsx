import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { socket } from "../../utils/socket";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/Button";

interface Player {
  username: string;
  points: number;
}

export default function Lobby() {
  const router = useRouter();
  const { roomId } = router.query;
  const [players, setPlayers] = useState<Player[]>([]);
  const isCreator = localStorage.getItem("isCreator") === "true";

  useEffect(() => {
    if (!roomId) return;

    // Join room
    socket.emit("join", {
      roomId,
      username: localStorage.getItem("username"),
    });

    // Listen for player updates
    socket.on("join", (data) => {
      setPlayers(data.players);
    });

    // Listen for game start
    socket.on("start", () => {
      router.push(`/game/${roomId}`);
    });

    return () => {
      socket.off("join");
      socket.off("start");
    };
  }, [roomId]);

  const startGame = () => {
    socket.emit("start", { roomId });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Game Lobby</h1>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl mb-4">Room Code: {roomId}</h2>
          <div className="grid grid-cols-1 gap-2">
            {players.map((player) => (
              <div
                key={player.username}
                className="bg-white p-3 rounded shadow"
              >
                {player.username}
              </div>
            ))}
          </div>
        </div>

        {isCreator ? (
          <Button onClick={startGame}>Start Game</Button>
        ) : (
          <p className="text-gray-600">Waiting for host to start the game...</p>
        )}
      </div>
    </Layout>
  );
}
