import { afterEach, describe, expect, it, vi } from "vitest";

import { request } from "./api";

describe("API service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed JSON for a successful request", async () => {
    const mockData = {
      memberId: "FF-1001",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      }),
    );

    const result = await request("/frequent-flyer");

    expect(result).toEqual(mockData);
  });

  it("throws an error when the server returns a failure status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    await expect(request("/frequent-flyer")).rejects.toThrow(
      "Request failed with status 500",
    );
  });

  it("throws a useful error when the network request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network failure")),
    );

    await expect(request("/frequent-flyer")).rejects.toThrow(
      "Network request failed",
    );
  });
});
