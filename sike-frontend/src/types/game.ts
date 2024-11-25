export interface Player {
  username: string;
  score: number;
  isReady: boolean;
}

export interface GameState {
  players: Player[];
  hasStarted: boolean;
  hasEnded: boolean;
  rounds: number;
  currentRound: number;
  roomId: string;
  creator: string;
  questions: string[];
  responses: any[];
}

export interface CreateGamePayload {
  username: string;
  rounds: number;
}

export interface JoinGamePayload {
  username: string;
  roomId: string;
}
