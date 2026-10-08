import { describe, expect, it, vi, beforeEach } from "vitest";

import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { FrequentFlyerPortal } from "./FrequentFlyerPortal";

import { getFrequentFlyerData } from "./flyerApi";

vi.mock("./flyerApi", () => ({
  getFrequentFlyerData: vi.fn(),
}));

describe("Frequent Flyer Portal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the main portal interface", () => {
    render(<FrequentFlyerPortal />);

    expect(
      screen.getByRole("heading", {
        name: /frequent flyer portal/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/member id/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /search/i,
      }),
    ).toBeInTheDocument();
  });

  it("prevents submission when the member ID is empty", async () => {
    const user = userEvent.setup();

    render(<FrequentFlyerPortal />);

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      }),
    );

    expect(screen.getByText("Member ID is required")).toBeInTheDocument();

    expect(getFrequentFlyerData).not.toHaveBeenCalled();
  });

  it("rejects malformed member IDs", async () => {
    const user = userEvent.setup();

    render(<FrequentFlyerPortal />);

    await user.type(screen.getByLabelText(/member id/i), "INVALID");

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      }),
    );

    expect(screen.getByText("Invalid Member ID")).toBeInTheDocument();

    expect(getFrequentFlyerData).not.toHaveBeenCalled();
  });

  it("shows a loading state while the request is pending", async () => {
    const user = userEvent.setup();

    let resolveRequest;

    getFrequentFlyerData.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        }),
    );

    render(<FrequentFlyerPortal />);

    await user.type(screen.getByLabelText(/member id/i), "FF-1001");

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      }),
    );

    expect(screen.getByText("Loading your information...")).toBeInTheDocument();

    resolveRequest({
      memberId: "FF-1001",
      name: "John Doe",
    });
  });

  it("displays returned frequent flyer information", async () => {
    const user = userEvent.setup();

    getFrequentFlyerData.mockResolvedValue({
      memberId: "FF-1001",
      name: "John Doe",
      status: "Gold",
    });

    render(<FrequentFlyerPortal />);

    await user.type(screen.getByLabelText(/member id/i), "FF-1001");

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      }),
    );

    expect(await screen.findByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("Gold")).toBeInTheDocument();
  });

  it("shows No data found when the result is empty", async () => {
    const user = userEvent.setup();

    getFrequentFlyerData.mockResolvedValue(null);

    render(<FrequentFlyerPortal />);

    await user.type(screen.getByLabelText(/member id/i), "FF-1001");

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      }),
    );

    expect(await screen.findByText("No data found")).toBeInTheDocument();
  });

  it("shows an error when the API request fails", async () => {
    const user = userEvent.setup();

    getFrequentFlyerData.mockRejectedValue(new Error("Request failed"));

    render(<FrequentFlyerPortal />);

    await user.type(screen.getByLabelText(/member id/i), "FF-1001");

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      }),
    );

    expect(await screen.findByText("Request failed")).toBeInTheDocument();
  });
});
