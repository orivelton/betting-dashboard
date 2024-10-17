import { render, screen, fireEvent } from "@testing-library/react";
import { SportFilter } from "./SportFilter";

jest.mock("@/consts/game", () => ({
  initialGames: [
    {
      id: "1",
      sport: "Soccer",
      teamA: "Liverpool",
      teamB: "Manchester United",
      oddsA: 2.1,
      oddsB: 1.8,
      betsA: 120,
      betsB: 150,
    },
    {
      id: "2",
      sport: "Basketball",
      teamA: "Lakers",
      teamB: "Celtics",
      oddsA: 1.9,
      oddsB: 2.0,
      betsA: 200,
      betsB: 180,
    },
    {
      id: "3",
      sport: "Baseball",
      teamA: "Yankees",
      teamB: "Red Sox",
      oddsA: 1.7,
      oddsB: 2.2,
      betsA: 150,
      betsB: 100,
    },
  ],
}));

describe("SportFilter", () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear(); // clear mock between tests
  });

  test("renders the sport filter options", () => {
    render(<SportFilter onFilterChange={mockOnFilterChange} />);

    // Check that the placeholder is rendered
    expect(screen.getByText("Filter by sport")).toBeInTheDocument();

    // Open the select dropdown
    fireEvent.click(screen.getByText("Filter by sport"));

    // Check that all the sports options are rendered
    expect(screen.getByText("All Sports")).toBeInTheDocument();
    expect(screen.getByText("Baseball")).toBeInTheDocument();
    expect(screen.getByText("Basketball")).toBeInTheDocument();
    expect(screen.getByText("Soccer")).toBeInTheDocument();
  });

  test("calls onFilterChange when a sport is selected", () => {
    render(<SportFilter onFilterChange={mockOnFilterChange} />);

    // Open the select dropdown
    fireEvent.click(screen.getByText("Filter by sport"));

    // Select "Soccer"
    fireEvent.click(screen.getByText("Soccer"));

    // Verify that the callback is called with "Soccer"
    expect(mockOnFilterChange).toHaveBeenCalledWith("Soccer");
  });
});
