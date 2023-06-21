import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    const result = await prisma.media.findMany({
      where: { uploadById: id },
      select: {
        id: true,
        name: true,
        path: true,
        size: true,
        description: true,
        author: true,
      },
    });

    return { data: result };
  } catch (error: any) {
    //handle error here
    console.log("error");
  }
});
