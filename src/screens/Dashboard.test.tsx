import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { initialGames } from "@/consts/game";

// Mock the SportFilter and GameCard components
jest.mock("@/components/SportFilter", () => ({
  SportFilter: ({
    onFilterChange,
  }: {
    onFilterChange: (sport: string) => void;
  }) => (
    <select
      data-testid="sport-filter"
      onChange={(e) => onFilterChange(e.target.value)}
    >
      <option value="all">All Sports</option>
      <option value="Soccer">Soccer</option>
      <option value="Basketball">Basketball</option>
      <option value="Baseball">Baseball</option>
    </select>
  ),
}));

jest.mock("@/components/GameCard", () => ({
  GameCard: ({ game, onPlaceBet }: { game: any; onPlaceBet: any }) => (
    <div data-testid="game-card">
      <div>
        {game.sport}: {game.teamA} vs {game.teamB}
      </div>
      <div>
        Odds: {game.oddsA} / {game.oddsB}
      </div>
      <button onClick={() => onPlaceBet(game.id, "A", 10)}>
        Bet on {game.teamA}
      </button>
      <button onClick={() => onPlaceBet(game.id, "B", 20)}>
        Bet on {game.teamB}
      </button>

      <div className="text-sm text-muted-foreground">
        Bets: {game.teamA} ({game.betsA}) - {game.teamB} ({game.betsB})
      </div>
    </div>
  ),
}));

describe("Dashboard", () => {
  test("renders the dashboard with games", () => {
    render(<Dashboard />);

    expect(screen.getByText("Betting Dashboard")).toBeInTheDocument();

    initialGames.forEach((game) => {
      expect(
        screen.getByText(`${game.sport}: ${game.teamA} vs ${game.teamB}`)
      ).toBeInTheDocument();
    });
  });

  test("filters games based on the selected sport", () => {
    render(<Dashboard />);

    fireEvent.change(screen.getByTestId("sport-filter"), {
      target: { value: "Soccer" },
    });

    expect(screen.queryByText("Soccer")).toBeInTheDocument();
    expect(screen.queryByText("Basketball:")).not.toBeInTheDocument();
    expect(screen.queryByText("Baseball:")).not.toBeInTheDocument();
  });

  test("places a bet and updates the game", () => {
    render(<Dashboard />);

    const betButtonA = screen.getByText(`Bet on ${initialGames[0].teamA}`);
    fireEvent.click(betButtonA);

    const betButtonB = screen.getByText(`Bet on ${initialGames[1].teamB}`);
    fireEvent.click(betButtonB);
    expect(
      screen.getByText(/bets: liverpool \(130\) \- manchester united \(150\)/i)
    ).toBeVisible();
  });

  test("resets all bets when the reset button is clicked", () => {
    render(<Dashboard />);

    const betButton = screen.getByText(`Bet on ${initialGames[0].teamA}`);
    fireEvent.click(betButton);

    const resetButton = screen.getByText("Reset All Bets");
    fireEvent.click(resetButton);
    expect(
      screen.getByText(/bets: liverpool \(120\) \- manchester united \(150\)/i)
    ).toBeVisible();
  });
});
