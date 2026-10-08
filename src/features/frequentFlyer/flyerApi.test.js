import { describe, expect, it, vi } from "vitest";

import { getFrequentFlyerData } from "./flyerApi";
import { request } from "../../services/api";

vi.mock("../../services/api", () => ({
  request: vi.fn(),
}));

describe("Frequent Flyer API", () => {
  it("requests frequent flyer data using the member ID", async () => {
    const mockResponse = {
      memberId: "FF-1001",
      name: "John Doe",
      status: "Gold",
    };

    request.mockResolvedValue(mockResponse);

    const result = await getFrequentFlyerData("FF-1001");

    expect(request).toHaveBeenCalledWith("/api/frequent-flyer/FF-1001");

    expect(result).toEqual(mockResponse);
  });

  it("rejects an empty member ID", async () => {
    await expect(getFrequentFlyerData("")).rejects.toThrow(
      "Member ID is required",
    );
  });
});
