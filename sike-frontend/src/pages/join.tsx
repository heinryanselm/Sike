import { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";

export default function JoinGame() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleJoin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/room/join/${roomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("username", username);
        localStorage.setItem("isCreator", "false");
        localStorage.setItem("roomId", roomId);
        router.push(`/lobby/${roomId}`);
      }
    } catch (error) {
      console.error("Failed to join room:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Join Game</h1>
        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <Button onClick={handleJoin} className="w-full">
          Join Room
        </Button>
      </div>
    </Layout>
  );
}
