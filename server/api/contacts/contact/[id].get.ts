import { DisplayMode, Player, PrismaClient } from "@prisma/client";
import { IAlbum } from "~/types";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    const result = await prisma.contact.findUnique({
      where: { id: id },
    });
    return { data: result };
  } catch (error: any) {
    console.log("error");
  }
});
