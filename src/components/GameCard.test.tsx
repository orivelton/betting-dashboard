import { render, screen, fireEvent } from "@testing-library/react";
import { GameCard } from "./GameCard";
import { Game } from "@/models/game";

const game: Game = {
  id: "1",
  sport: "Soccer",
  teamA: "Liverpool",
  teamB: "Manchester United",
  oddsA: 2.1,
  oddsB: 1.8,
  betsA: 120,
  betsB: 150,
};

const mockOnPlaceBet = jest.fn();

describe("GameCard", () => {
  beforeEach(() => {
    mockOnPlaceBet.mockClear(); // clear mock between tests
  });

  test("renders game information", () => {
    render(<GameCard game={game} onPlaceBet={mockOnPlaceBet} />);

    // Check that the sport, teams, odds, and bets are displayed
    expect(screen.getByText("Soccer")).toBeInTheDocument();
    expect(screen.getByText("Liverpool")).toBeInTheDocument();
    expect(screen.getByText("Manchester United")).toBeInTheDocument();
    expect(screen.getByText("Odds: 2.1")).toBeInTheDocument();
    expect(screen.getByText("Odds: 1.8")).toBeInTheDocument();
    expect(
      screen.getByText("Bets: Liverpool (120) - Manchester United (150)")
    ).toBeInTheDocument();
  });

  test('opens the bet dialog when "Place a bet" is clicked', () => {
    render(<GameCard game={game} onPlaceBet={mockOnPlaceBet} />);

    const placeBetButton = screen.getByText("Place a bet");
    fireEvent.click(placeBetButton);

    expect(screen.getByText("Place your bet")).toBeInTheDocument(); // Check that the dialog opens
  });

  test("allows selecting a team and entering a bet amount", () => {
    render(<GameCard game={game} onPlaceBet={mockOnPlaceBet} />);

    // Open the dialog
    const placeBetButton = screen.getByText("Place a bet");
    fireEvent.click(placeBetButton);

    // Select team A
    const teamARadio = screen.getByLabelText("Liverpool");
    fireEvent.click(teamARadio);
    expect(teamARadio).toBeChecked();

    // Enter a bet amount
    const betAmountInput = screen.getByPlaceholderText("Bet amount");
    fireEvent.change(betAmountInput, { target: { value: "50" } });
    expect(betAmountInput).toHaveValue(50);
  });

  test("calls onPlaceBet when the bet is confirmed", () => {
    render(<GameCard game={game} onPlaceBet={mockOnPlaceBet} />);

    // Open the dialog
    const placeBetButton = screen.getByText("Place a bet");
    fireEvent.click(placeBetButton);

    // Select team B
    const teamBRadio = screen.getByLabelText("Manchester United");
    fireEvent.click(teamBRadio);
    expect(teamBRadio).toBeChecked();

    // Enter a bet amount
    const betAmountInput = screen.getByPlaceholderText("Bet amount");
    fireEvent.change(betAmountInput, { target: { value: "100" } });

    // Confirm the bet
    const confirmButton = screen.getByText("Confirm Bet");
    fireEvent.click(confirmButton);

    // Check that onPlaceBet was called with the correct arguments
    expect(mockOnPlaceBet).toHaveBeenCalledWith("1", "B", 100);
  });
});
