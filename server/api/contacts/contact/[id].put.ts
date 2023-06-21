import { PrismaClient } from "@prisma/client";
import { IPerson } from "~/types";

const prisma = new PrismaClient();

interface IBodyContact extends IPerson {
  uid: string;
  prompt: void;
}

export default defineEventHandler(async (event) => {
  const body: IBodyContact = await readBody(event);
  try {
    //@ts-ignore
    const sentPrompt = body.prompt;
    const result = await prisma.contact.update({
      where: { id: body.id },
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        role: body.role,
      },
    });
    return { data: sentPrompt };
  } catch (error) {
    console.log(error);
  }
});
