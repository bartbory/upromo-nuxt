import { PrismaClient } from "@prisma/client";
import { IPerson } from "~/types";

const prisma = new PrismaClient();

interface IBodyContact extends IPerson {
  uid: string;
  prompt: void;
}

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  try {
    //@ts-ignore
    const result = await prisma.contact.delete({
      where: { id: id },
    });
    return { data: result };
  } catch (error) {
    console.log(error);
  }
});
