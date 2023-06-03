import axios from "axios";
export default async function updateDetails(uid: string | null) {
  let data: object;

  axios
    .get(
      `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
    )
    .then((response) => {
      data = response.data;
      return { data };
    });
  // try {
  //   const response = await fetch(
  //     `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
  //   );
  //   const responseData = await response.json();
  //   console.log(responseData);
  //   return responseData;
  // } catch (error) {
  //   throw new Error();
  // }

  // await fetch(
  //   `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
  // )
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error();
  //     }
  //     response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     return data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}
