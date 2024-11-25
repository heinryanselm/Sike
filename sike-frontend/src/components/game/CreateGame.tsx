import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { createGame } from "../../services/api";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export const CreateGame = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [rounds, setRounds] = useState(1);

  const createGameMutation = useMutation(createGame, {
    onSuccess: (response) => {
      console.log("Game created:", response);
      sessionStorage.setItem("username", username);
      router.push(`/game/${response.data.roomId}`);
    },
    onError: (error) => {
      console.error("Create game error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGameMutation.mutate({ username, rounds });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          label="Number of Rounds"
          type="number"
          min={1}
          max={10}
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
          required
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!username || rounds < 1}
        >
          Create Game
        </Button>
      </form>
    </div>
  );
};
