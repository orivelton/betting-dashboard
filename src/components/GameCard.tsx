"use client";

import { Game } from "@/models/game";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const GameCard: React.FC<{
  game: Game;
  onPlaceBet: (gameId: string, team: "A" | "B", amount: number) => void;
}> = ({ game, onPlaceBet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B">("A");
  const [betAmount, setBetAmount] = useState("");

  const handleBet = () => {
    onPlaceBet(game.id, selectedTeam, Number(betAmount));
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{game.sport}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <span>{game.teamA}</span>
          <span>Odds: {game.oddsA}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>{game.teamB}</span>
          <span>Odds: {game.oddsB}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Bets: {game.teamA} ({game.betsA}) - {game.teamB} ({game.betsB})
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Place a bet</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Place your bet</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <RadioGroup
              value={selectedTeam}
              onValueChange={(value: "A" | "B") => setSelectedTeam(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="A" id="teamA" />
                <Label htmlFor="teamA">{game.teamA}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="B" id="teamB" />
                <Label htmlFor="teamB">{game.teamB}</Label>
              </div>
            </RadioGroup>
            <Input
              type="number"
              placeholder="Bet amount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
            />
            <Button onClick={handleBet}>Confirm Bet</Button>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
