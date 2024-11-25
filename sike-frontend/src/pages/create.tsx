import { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";

export default function CreateGame() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [rounds, setRounds] = useState(1);

  const handleCreate = async () => {
    try {
      const response = await fetch("https://sike-8odb.vercel.app/room/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, rounds }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("username", username);
        localStorage.setItem("isCreator", "true");
        router.push(`/lobby/${data.data.roomId}`);
      }
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Game</h1>
        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          min="1"
          max="10"
          value={rounds}
          onChange={(e) => setRounds(parseInt(e.target.value))}
          className="w-full p-2 mb-4 border rounded"
        />
        <Button onClick={handleCreate}>Create Room</Button>
      </div>
    </Layout>
  );
}
