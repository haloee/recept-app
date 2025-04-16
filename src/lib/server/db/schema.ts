import { mysqlTable, varchar, timestamp, float, int } from "drizzle-orm/mysql-core";

// Felhasználók táblája
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),  
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Bevásárlólista táblája
export const shoppingList = mysqlTable("shopping_list", {
  id: int("id").primaryKey().autoincrement(),  
  userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),  
  ingredientName: varchar("ingredient_name", { length: 255 }).notNull(),
  quantity: float("quantity").notNull(),
  unit: varchar("unit", { length: 50 }).default(""),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});
