import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const sentPrompt = body.prompt;
    const result = await prisma.media.update({
      where: { id: body.id },
      data: {
        author: body.author,
        description: body.description,
      },
    });

    return { data: sentPrompt };
  } catch (error: any) {
    //handle error here
    console.log("error: ", error);
  }
});
