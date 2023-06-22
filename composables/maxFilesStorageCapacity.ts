import { PlanTypes } from "~/types";

export default function maxImageStorageCapacity(plan: PlanTypes) {
  switch (plan) {
    case "LITE":
      return 50;
      break;
    case "BASIC":
      return 100;
      break;
    case "PRO":
      return 200;
      break;
    default:
      return 100;
      break;
  }
}
