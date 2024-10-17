import { initialGames } from "@/consts/game";
import { BetAction, Game } from "@/models/game";

export function betReducer(state: Game[], action: BetAction): Game[] {
  switch (action.type) {
    case "PLACE_BET":
      return state.map((game) =>
        game.id === action.gameId
          ? {
              ...game,
              betsA:
                action.team === "A" ? game.betsA + action.amount : game.betsA,
              betsB:
                action.team === "B" ? game.betsB + action.amount : game.betsB,
            }
          : game
      );
    case "RESET":
      return initialGames;
    default:
      return state;
  }
}