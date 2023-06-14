import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.userId;
    console.log("user:", id);
    const result = await prisma.album.findMany({
      where: { createdById: id },
    });

    return { data: result };
  } catch (error: any) {
    //handle error here
    console.log("error");
  }
});
