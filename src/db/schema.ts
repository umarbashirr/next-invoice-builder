import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const clientsTable = pgTable("clients_table", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  phone: text("phone"),
  billingAddressId: serial("billing_address_id").references(
    () => addressTable.id,
    {
      onDelete: "cascade",
    }
  ),
  isShippingSameAsBilling: boolean("is_shipping_same_as_billing").default(
    false
  ),
  shippingAddressId: serial("shipping_address_id").references(
    () => addressTable.id,
    { onDelete: "cascade" }
  ),
  orgId: text("org_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const addressTable = pgTable("address_table", {
  id: serial("id").primaryKey(),
  street: text("street"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  country: text("country"),
});

export type InsertClient = typeof clientsTable.$inferInsert;
export type SelectClient = typeof clientsTable.$inferSelect;

export type InsertAddress = typeof addressTable.$inferInsert;
export type SelectAddress = typeof addressTable.$inferSelect;
