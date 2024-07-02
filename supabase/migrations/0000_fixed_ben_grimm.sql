CREATE TABLE IF NOT EXISTS "address_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"street" serial NOT NULL,
	"city" serial NOT NULL,
	"state" serial NOT NULL,
	"zip" serial NOT NULL,
	"country" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clients_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" serial NOT NULL,
	"email" serial NOT NULL,
	"phone" serial NOT NULL,
	"address_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "clients_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clients_table" ADD CONSTRAINT "clients_table_address_id_address_table_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."address_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
