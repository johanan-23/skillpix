CREATE TABLE "activity_log" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"admin_id" text,
	"action" text NOT NULL,
	"details" text,
	"created_at" timestamp NOT NULL
);
