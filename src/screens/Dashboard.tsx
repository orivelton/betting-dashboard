"use client";

import { useState, useReducer, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { initialGames } from "@/consts/game";
import { SportFilter } from "@/components/SportFilter";
import { GameCard } from "@/components/GameCard";
import { betReducer } from "@/actions/betReducer";

export default function Dashboard() {
  const [games, dispatch] = useReducer(betReducer, initialGames);
  const [sportFilter, setSportFilter] = useState("all");

  const handlePlaceBet = (gameId: string, team: "A" | "B", amount: number) => {
    dispatch({ type: "PLACE_BET", gameId, team, amount });
  };

  const filteredGames = useMemo(
    () =>
      sportFilter === "all"
        ? games
        : games.filter((game) => game.sport === sportFilter),
    [sportFilter, games]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Betting Dashboard</h1>
      <div className="mb-4">
        <SportFilter onFilterChange={setSportFilter} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} onPlaceBet={handlePlaceBet} />
        ))}
      </div>
      <div className="mt-4">
        <Button onClick={() => dispatch({ type: "RESET" })}>
          Reset All Bets
        </Button>
      </div>
    </div>
  );
}
