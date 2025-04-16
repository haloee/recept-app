import { json, type RequestEvent } from '@sveltejs/kit';
import axios from 'axios';

export async function GET({ url }: RequestEvent) {
    try {
        const query = url.searchParams.get('query');
        const recipeId = url.searchParams.get('id');
        const apiKey = process.env.SPOONACULAR_API_KEY;

        if (!apiKey) {
            console.error(" Spoonacular API kulcs hiányzik!");
            return json({ error: "API kulcs nincs beállítva" }, { status: 500 });
        }

        if (recipeId) {
            console.log(` Recept részleteinek lekérése ID alapján: ${recipeId}`);
            const detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
            const response = await axios.get(detailsUrl);
            return json(response.data);
        }

        if (query) {
            console.log(` Recept keresése: ${query}`);
            const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10&addRecipeInformation=true`;
            const response = await axios.get(searchUrl);
            return json(response.data.results);
        }

        return json({ error: "Nincs megadva keresési paraméter." }, { status: 400 });

    } catch (error) {
        console.error(" Hiba a recept API végponton:", error);
        return json({ error: "Nem sikerült lekérni az adatokat." }, { status: 500 });
    }
}
