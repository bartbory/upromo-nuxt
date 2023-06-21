import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.userId;
    const result = await prisma.album.findMany({
      where: { createdById: id },
      select: {
        id: true,
        albumName: true,
        artistName: true,
        albumSlug: true,
        artistSlug: true,
        imageCoverPath: true,
        releaseDate: true,
        secret: true,
      },
    });

    return { data: result };
  } catch (error: any) {
    //handle error here
    console.log("error");
  }
});
