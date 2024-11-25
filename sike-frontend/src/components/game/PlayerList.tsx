import { Player } from "../../types/game";

interface PlayerListProps {
  players: Player[];
}

export const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Players:</h3>
      <div className="grid grid-cols-2 gap-4">
        {players.map((player) => (
          <div
            key={player.username}
            className="bg-gray-50 p-3 rounded flex items-center justify-between"
          >
            <span>{player.username}</span>
            {player.isReady && <span className="text-green-500">Ready</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
