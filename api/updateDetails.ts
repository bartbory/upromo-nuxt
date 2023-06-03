// import { UserDetails } from "@/types";

export default async function updateDetails(data: any) {
  const uid = localStorage.getItem("uid");
  await fetch(
    `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/details.json`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}
