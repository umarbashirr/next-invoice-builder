ALTER TABLE "clients_table" RENAME COLUMN "address_id" TO "billing_address_id";--> statement-breakpoint
ALTER TABLE "clients_table" DROP CONSTRAINT "clients_table_address_id_address_table_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clients_table" ADD CONSTRAINT "clients_table_billing_address_id_address_table_id_fk" FOREIGN KEY ("billing_address_id") REFERENCES "public"."address_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
