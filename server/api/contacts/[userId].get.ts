import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.userId;
    console.log("user:", id);
    const result = await prisma.contact.findMany({
      where: { createdById: id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return { data: result };
  } catch (error: any) {
    //handle error here
    console.log("error");
  }
});
