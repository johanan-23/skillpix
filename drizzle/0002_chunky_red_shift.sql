ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'student';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "banned" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "institution" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "grade_level" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "enrolled_courses" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "progress_json" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "preferences_json" text;