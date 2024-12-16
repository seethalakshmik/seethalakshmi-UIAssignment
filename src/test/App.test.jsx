import { render, screen, waitFor } from "@testing-library/react";
import RewardsProgram from "../App";

// Mock data for testing
const simulatedData = [
  {
    customerId: 1,
    name: "John Doe",
    transactions: [
      { date: "2024-10-15", amount: 120 },
      { date: "2024-11-10", amount: 75 },
      { date: "2024-12-05", amount: 150 },
    ],
  },
  {
    customerId: 2,
    name: "Jane Smith",
    transactions: [
      { date: "2024-10-20", amount: 95 },
      { date: "2024-11-18", amount: 55 },
      { date: "2024-12-15", amount: 130 },
    ],
  },
];

// Simulate an error during fetch (optional to simulate failures in different test cases)
const simulateError = false;

jest.mock("./RewardsProgram", () => {
  return {
    ...jest.requireActual("./RewardsProgram"),
    simulateError, // Control this flag to simulate errors
  };
});

describe("RewardsProgram", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // We are simulating a delay
  });

  afterEach(() => {
    jest.useRealTimers(); // Clean up the timers after each test
  });

  it("should display loading text initially", () => {
    render(<RewardsProgram />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display error message if the fetch fails", async () => {
    simulateError = true; // Simulating an error

    render(<RewardsProgram />);

    await waitFor(() => expect(screen.getByText(/failed to fetch transaction data/i)).toBeInTheDocument());
  });

  it("should display reward points correctly when data is fetched", async () => {
    render(<RewardsProgram />);

    // Simulate the API delay and render the data
    await waitFor(() => expect(screen.getByText(/john doe/i)).toBeInTheDocument());

    // Check if customer data is rendered
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    expect(screen.getByText(/october: 90 points/i)).toBeInTheDocument();
    expect(screen.getByText(/november: 60 points/i)).toBeInTheDocument();
    expect(screen.getByText(/december: 200 points/i)).toBeInTheDocument();
  });

  it("should calculate total points correctly for each customer", async () => {
    render(<RewardsProgram />);

    await waitFor(() => expect(screen.getByText(/john doe/i)).toBeInTheDocument());

    // Check the total points for John Doe
    expect(screen.getByText(/total points: 350 points/i)).toBeInTheDocument();
    // Check the total points for Jane Smith
    expect(screen.getByText(/total points: 250 points/i)).toBeInTheDocument();
  });
});
