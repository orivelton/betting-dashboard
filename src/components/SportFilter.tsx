"use client";

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
  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by sport" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Sports</SelectItem>
        <SelectItem value="Soccer">Soccer</SelectItem>
        <SelectItem value="Basketball">Basketball</SelectItem>
        <SelectItem value="Baseball">Baseball</SelectItem>
      </SelectContent>
    </Select>
  );
};
