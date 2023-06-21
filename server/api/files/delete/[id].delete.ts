import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const sentPrompt = body.prompt;
    const userId = event.context.params?.userId;
    const result = await prisma.file.delete({
      where: { id: body.id },
    });

    return { data: sentPrompt };
  } catch (error: any) {
    //handle error here
    console.log("error: ", error);
  }
});
