import { PlanTypes } from "~/types";

export default function maxFileStorageCapacity(plan: PlanTypes) {
  switch (plan) {
    case "LITE":
      return 10;
      break;
    case "BASIC":
      return 25;
      break;
    case "PRO":
      return 100;
      break;
    default:
      return 20;
      break;
  }
}
