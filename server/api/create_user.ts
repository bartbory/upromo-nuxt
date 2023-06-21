import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const sentPrompt = body.prompt;
    const result = await prisma.user.create({
      data: {
        id: body.id,
        email: body.email,
        name: body.name,
        avatar: body.avatar,
        plan: body.plan,
      },
    });

    return { data: sentPrompt };
  } catch (error: any) {
    //handle error here
    console.log(error);
  }
});
