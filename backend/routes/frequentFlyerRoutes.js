import express from "express";
import frequentFlyerData from "../data/frequentFlyerData.js";

const router = express.Router();

router.get("/:memberId", (req, res) => {
  const memberId = String(req.params.memberId ?? "").trim().toUpperCase();

  if (!memberId) {
    return res.status(400).json({
      message: "Member ID is required"
    });
  }

  const member = frequentFlyerData.find(
    (item) => item.memberId === memberId
  );

  if (!member) {
    return res.status(404).json({
      message: "No frequent flyer data found for this member ID"
    });
  }

  return res.status(200).json(member);
});

export default router;
