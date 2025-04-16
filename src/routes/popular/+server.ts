import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function GET() {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;

    try {
        const response = await axios.get(url);
        return json(response.data.recipes);
    } catch (error) {
        console.error('Hiba a népszerű receptek lekérésekor:', error);
        return json({ error: 'Nem sikerült lekérni a recepteket.' }, { status: 500 });
    }
}
