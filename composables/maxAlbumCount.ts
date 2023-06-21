import { PlanTypes } from "~/types";

export default function maxAlbumCount(plan: PlanTypes) {
  switch (plan) {
    case "LITE":
      return 1;
      break;
    case "BASIC":
      return 3;
      break;
    case "PRO":
      return 5;
      break;
    default:
      return 1;
      break;
  }
}
