export interface Game {
  id: string;
  sport: string;
  teamA: string;
  teamB: string;
  oddsA: number;
  oddsB: number;
  betsA: number;
  betsB: number;
}

export type BetAction =
  | { type: "PLACE_BET"; gameId: string; team: "A" | "B"; amount: number }
  | { type: "RESET" };