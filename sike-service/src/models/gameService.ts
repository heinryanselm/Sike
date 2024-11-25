import { GameModel } from "../models/game";
import { Server } from "socket.io";
import { ResponseDocSchema } from "../utils/interfaces";

export class GameService {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  // Generate fun questions about players
  private generateQuestions(players: string[]): string[] {
    const questionTemplates = [
      "What would PLAYER do if they won a million dollars?",
      "What's PLAYER's secret superpower?",
      "If PLAYER was a movie character, who would they be?",
      "What would PLAYER's autobiography be titled?",
      "What's PLAYER's most embarrassing moment?",
    ];

    const questions: string[] = [];
    players.forEach((player) => {
      questionTemplates.forEach((template) => {
        questions.push(template.replace("PLAYER", player));
      });
    });

    return this.shuffleArray(questions);
  }

  private shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  async startGame(roomId: string): Promise<void> {
    const game = await GameModel.findOne({ roomId });
    if (!game) return;

    const playerNames = game.players.map((p) => p.username);
    const questions = this.generateQuestions(playerNames);

    game.questions = questions;
    game.hasStarted = true;
    game.currentRound = 0;
    await game.save();

    this.io.to(roomId).emit("game_started", {
      currentQuestion: questions[0],
      currentRound: 0,
      totalRounds: game.rounds,
    });
  }

  async submitAnswer(
    roomId: string,
    username: string,
    answer: string
  ): Promise<void> {
    const game = await GameModel.findOne({ roomId });
    if (!game) return;

    //@ts-ignore
    const newResponse = new ResponseModel({
      response: answer,
      username,
      question: game.questions[game.currentRound],
      answer: answer,
      votes: [],
      round: game.currentRound,
    });

    game.responses.push(newResponse);

    // Check if all players answered
    if (
      game.responses.filter(
        (r: ResponseDocSchema) => r.round === game.currentRound
      ).length === game.players.length
    ) {
      game.currentRound += 1;

      // Check if game should end
      if (game.currentRound >= game.rounds) {
        game.hasEnded = true;
      }
    }

    await game.save();
    this.io.to(roomId).emit("game_state", game);
  }
}
