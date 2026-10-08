export function validateMemberId(value) {
  const memberId = String(value ?? "").trim();

  if (!memberId) {
    return "Member ID is required";
  }

  if (!/^FF-\d{4}$/.test(memberId)) {
    return "Invalid Member ID";
  }

  return "";
}
