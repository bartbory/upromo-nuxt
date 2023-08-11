interface Subscribe {
  email: string;
  prompt: void;
}

export default defineEventHandler(async (event) => {
  const body: Subscribe = await readBody(event);
  console.log(body);
  try {
    const sentPrompt = body.prompt;
    const response = await fetch(
      `https://us21.api.mailchimp.com/3.0/lists/1522d0a095/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "apikey 1cd2ec248530387ec8b2719099ef2bd6-us21",
        },
        body: JSON.stringify({
          email_address: body.email,
          status: "subscribed",
        }),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      // Handle success
      console.log("Success:", responseData);
      return { responseData };
    } else {
      // Handle error
      console.error("Error subscribing:", responseData);
      return { responseData };
    }
  } catch (error) {
    console.error("Error subscribing:", error);
    return { error };
  }
});
