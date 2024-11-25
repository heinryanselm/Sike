import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { socket } from "../../utils/socket";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/Button";

type GamePhase = "waiting" | "question" | "answering" | "voting" | "results";

interface Response {
  username: string;
  response: string;
  question: string;
  votes: string[];
}

export default function GameRoom() {
  const router = useRouter();
  const { roomId } = router.query;
  const [phase, setPhase] = useState<GamePhase>("waiting");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [responses, setResponses] = useState<Response[]>([]);
  const [answer, setAnswer] = useState("");
  const [username, setUsername] = useState<string>("");
  const [isCreator, setIsCreator] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState({
    isCreator: false,
    players: [],
    currentRound: 1,
    totalRounds: 0,
    hasStarted: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && roomId) {
      const storedUsername = localStorage.getItem("username");
      const storedIsCreator = localStorage.getItem("isCreator") === "true";

      setUsername(storedUsername || "");
      setIsCreator(storedIsCreator);

      socket.emit("join", {
        roomId,
        username: storedUsername,
      });

      socket.on("join", (data) => {
        setPlayers(data.players);
      });

      socket.on("start", (data) => {
        console.log("Game started:", data);
        setPhase("answering");
        const question = data.questions?.[0] || "What's your favorite color?";
        setCurrentQuestion(question);
      });

      socket.on("attempt", (data) => {
        if (data.updatedGame) {
          setResponses(data.updatedGame.responses || []);
          if (data.updatedGame.responses?.length === players.length) {
            setPhase("voting");
          }
        }
      });

      socket.on("allResponsesReceived", (data) => {
        setPhase("voting");
        setResponses(data.responses);
      });
    }

    return () => {
      socket.off("join");
      socket.off("start");
      socket.off("attempt");
    };
  }, [roomId]);

  const handleVote = (responseUsername: string) => {
    socket.emit("vote", {
      roomId,
      username,
      votedFor: responseUsername,
    });
  };

  const handleStartGame = () => {
    socket.emit("start", { roomId });
  };

  const submitAnswer = () => {
    if (answer.trim() && currentQuestion) {
      socket.emit("attempt", {
        roomId,
        username,
        response: answer,
        question: currentQuestion,
      });
      setAnswer("");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        {phase === "waiting" && (
          <div className="text-center">
            <h3 className="text-xl mb-4">Players in game:</h3>
            {players.map((player, index) => (
              <div key={index} className="mb-2">
                {player.username}
              </div>
            ))}
            {isCreator && (
              <Button onClick={handleStartGame} className="mt-4">
                Start Game
              </Button>
            )}
          </div>
        )}

        {phase === "answering" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">{currentQuestion}</h2>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Type your answer..."
            />
            <Button onClick={submitAnswer} className="w-full">
              Submit Answer
            </Button>
          </div>
        )}

        {phase === "voting" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">
              Vote for the best answer!
            </h2>
            <div className="grid gap-4">
              {responses
                .filter((response) => response.username !== username)
                .map((response, index) => (
                  <Button
                    key={index}
                    onClick={() => handleVote(response.username)}
                    className="w-full p-4 text-left"
                  >
                    {response.response}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
