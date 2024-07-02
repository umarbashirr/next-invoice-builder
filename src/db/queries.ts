import { z } from "zod";
import { db } from ".";
import {
  InsertAddress,
  InsertClient,
  addressTable,
  clientsTable,
} from "./schema";
import { clientFormSchema } from "@/app/(platform)/(dashboard)/organization/[id]/(routes)/clients/_components/ClientForm";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export async function createNewClient(
  data: z.infer<typeof clientFormSchema>,
  orgId: string
) {
  try {
    return await db.transaction(async (tx) => {
      const [insertedAddress] = await tx
        .insert(addressTable)
        .values(data.address)
        .returning();

      console.log("insertedAddress", insertedAddress);

      let shippingAddress;

      if (!data.isShippingSameAsBilling) {
        const [insertedShippingAddress] = await tx
          .insert(addressTable)
          .values(data.shippingAddress)
          .returning();

        shippingAddress = insertedShippingAddress;
      } else {
        shippingAddress = insertedAddress;
      }

      console.log("shippingAddress", shippingAddress);

      const [insertedClient] = await tx
        .insert(clientsTable)
        .values({
          name: data.name,
          email: data?.email,
          phone: data?.phone,
          billingAddressId: insertedAddress.id,
          shippingAddressId: shippingAddress.id,
          isShippingSameAsBilling: data.isShippingSameAsBilling,
          orgId: orgId,
        })
        .returning();

      console.log(insertedClient);

      return { success: true, data: insertedClient };
    });
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getClients() {
  const billingAddress = alias(addressTable, "billingAddress");
  const shippingAddress = alias(addressTable, "shippingAddress");
  return await db
    .select()
    .from(clientsTable)
    .innerJoin(
      billingAddress,
      eq(clientsTable.billingAddressId, billingAddress.id)
    )
    .innerJoin(
      shippingAddress,
      eq(clientsTable.shippingAddressId, shippingAddress.id)
    );
}
