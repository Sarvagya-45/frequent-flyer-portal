import { request } from "../../services/api";

export async function getFrequentFlyerData(memberId) {
  const normalizedId = String(memberId ?? "").trim();

  if (!normalizedId) {
    throw new Error("Member ID is required");
  }

  return request(`/api/frequent-flyer/${encodeURIComponent(normalizedId)}`);
}
