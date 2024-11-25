import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { joinGame } from "../../services/api";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export const JoinGame = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinGameMutation = useMutation(joinGame, {
    onSuccess: (data) => {
      router.push(`/game/${data.data.roomId}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinGameMutation.mutate({ username, roomId });
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
          label="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Join Game
        </Button>
      </form>
    </div>
  );
};
