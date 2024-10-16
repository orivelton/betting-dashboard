"use client";

import { initialGames } from "@/consts/game";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SportFilter: React.FC<{
  onFilterChange: (sport: string) => void;
}> = ({ onFilterChange }) => {
  const gameoptions = [
    ...new Set(initialGames.map((item) => item.sport)),
  ].sort();

  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by sport" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Sports</SelectItem>
        {gameoptions.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
