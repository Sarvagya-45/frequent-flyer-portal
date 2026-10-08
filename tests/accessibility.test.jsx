import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";

import FrequentFlyerPortal from "../src/features/frequentFlyer/FrequentFlyerPortal";

describe("Accessibility requirements", () => {
  it("provides an accessible portal heading", () => {
    render(<FrequentFlyerPortal />);

    expect(
      screen.getByRole("heading", {
        name: /frequent flyer portal/i,
      }),
    ).toBeInTheDocument();
  });

  it("provides an accessible member ID input", () => {
    render(<FrequentFlyerPortal />);

    expect(screen.getByLabelText(/member id/i)).toBeInTheDocument();
  });

  it("provides an accessible search button", () => {
    render(<FrequentFlyerPortal />);

    expect(
      screen.getByRole("button", {
        name: /search/i,
      }),
    ).toBeInTheDocument();
  });
});
