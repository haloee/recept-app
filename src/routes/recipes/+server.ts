import { json } from '@sveltejs/kit';
import axios from 'axios';
import type { RequestEvent } from '../api/shopping-list/$types';

export async function GET({ url }:RequestEvent) {
    const query = url.searchParams.get('query');
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;

    try {
        const response = await axios.get(searchUrl);
        return json(response.data.results);
    } catch (error) {
        console.error('Hiba a keresés során:', error);
        return json({ error: 'Nem sikerült keresni a recepteket.' }, { status: 500 });
    }
}
