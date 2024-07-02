ALTER TABLE "clients_table" ADD COLUMN "shipping_address_id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clients_table" ADD CONSTRAINT "clients_table_shipping_address_id_address_table_id_fk" FOREIGN KEY ("shipping_address_id") REFERENCES "public"."address_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
