import { Server, Socket } from "socket.io";
import { GameService } from "../services/gameService";

export default function socketHandler(io: Server) {
  const gameService = new GameService(io);

  io.on("connection", (socket: Socket) => {
    socket.on("join_room", ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on("start_game", async ({ roomId }) => {
      await gameService.startGame(roomId);
    });

    socket.on("submit_answer", async ({ roomId, username, answer }) => {
      await gameService.submitAnswer(roomId, username, answer);
    });

    socket.on("leave_room", ({ roomId }) => {
      socket.leave(roomId);
    });
  });
}
