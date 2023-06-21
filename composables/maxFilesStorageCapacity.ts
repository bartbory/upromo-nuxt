import { PlanTypes } from "~/types";

export default function maxImageStorageCapacity(plan: PlanTypes) {
  switch (plan) {
    case "LITE":
      return 10;
      break;
    case "BASIC":
      return 25;
      break;
    case "PRO":
      return 50;
      break;
    default:
      return 100;
      break;
  }
}
