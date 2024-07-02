"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { clientFormSchema } from "./_components/ClientForm";
import { createNewClient, getClients } from "@/db/queries";

export const createClient = async (
  values: z.infer<typeof clientFormSchema>
) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { success: false, message: "Not authorized" };
    }

    console.log(orgId);

    const data = await createNewClient(values, orgId as string);

    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const fetchClients = async () => {
  try {
    const data = await getClients();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
