import { PlanTypes } from "~/types";

export default function maxFileStorageCapacity(plan: PlanTypes) {
  switch (plan) {
    case "LITE":
      return 5;
      break;
    case "BASIC":
      return 15;
      break;
    case "PRO":
      return 30;
      break;
    default:
      return 30;
      break;
  }
}
