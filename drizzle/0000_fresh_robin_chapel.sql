CREATE TABLE `shopping_list` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`ingredient_name` varchar(255) NOT NULL,
	`quantity` float NOT NULL,
	`unit` varchar(50) DEFAULT '',
	`added_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `shopping_list_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `shopping_list` ADD CONSTRAINT `shopping_list_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;