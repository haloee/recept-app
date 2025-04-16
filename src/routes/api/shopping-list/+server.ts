import { json, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db/index';
import { shoppingList } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Bevásárlólista lekérése
export async function GET(event: RequestEvent) {
    const userId = event.locals.user?.id || 1;  // Most már nincs hiba, mert a Locals típus definiálva van
    const items = await db.select().from(shoppingList).where(eq(shoppingList.userId, userId));
    return json(items);
}

// Hozzávaló hozzáadása
export async function POST(event: RequestEvent) {
    const { request, locals } = event;  // Így már típusos lesz

    const userId = locals.user?.id || 1;
    const { ingredientName, quantity, unit } = await request.json();

    await db.insert(shoppingList).values({
        userId,
        ingredientName,
        quantity,
        unit
    });

    return json({ success: true });
}

// Hozzávaló törlése
export async function DELETE(event: RequestEvent) {
    const { request } = event;
    const { id } = await request.json();

    await db.delete(shoppingList).where(eq(shoppingList.id, id));

    return json({ success: true });
}
