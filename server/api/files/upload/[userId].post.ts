import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const sentPrompt = body.prompt;
    const userId = event.context.params?.userId;
    const result = await prisma.file.create({
      data: {
        uploadBy: { connect: { id: userId } },
        name: body.name,
        extention: body.extention,
        path: `https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/${userId}/files/${body.name}`,
        size: body.size,
      },
    });

    return { data: sentPrompt };
  } catch (error: any) {
    //handle error here
    console.log("error: ", error);
  }
});
