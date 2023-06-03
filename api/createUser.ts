// import { User } from "@/types";

export default async function createUser(data: any) {
  const userData = { name: data.name, email: data.email };
  await fetch(`${process.env.VUE_APP_APIKEY}/users/${data.id}.json`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
}
