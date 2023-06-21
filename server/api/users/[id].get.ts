import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    const result = await prisma.user.findUnique({
      where: { id: id },
      select: { email: true, name: true, avatar: true, plan: true },
    });

    return { data: result };
  } catch (error: any) {
    //handle error here
    console.log("error");
  }
});
