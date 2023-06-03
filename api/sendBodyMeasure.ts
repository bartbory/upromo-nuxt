// import { IBodyMeasurement } from "@/types";

export default async function sendBodyMeasure(data: any) {
  const date = data.date;
  const uid = localStorage.getItem("uid");
  await fetch(
    `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/measurements/${date.getTime()}.json`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}
