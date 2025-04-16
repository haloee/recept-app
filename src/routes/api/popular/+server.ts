import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function GET() {
    try {
        const apiKey = process.env.SPOONACULAR_API_KEY;
        if (!apiKey) {
            console.error(" Spoonacular API kulcs hiányzik! Állítsd be a .env fájlban.");
            return json({ error: "API kulcs nincs beállítva" }, { status: 500 });
        }

        const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;
        const response = await axios.get(url);

        if (!response.data || !response.data.recipes) {
            console.error(" Helytelen API válasz:", response.data);
            return json({ error: "Nem sikerült lekérni a recepteket" }, { status: 500 });
        }

        return json(response.data.recipes);
    } catch (error) {
        console.error(" Hiba történt a népszerű receptek lekérése közben:", error);
        return json({ error: "Nem sikerült lekérni a recepteket." }, { status: 500 });
    }
}
