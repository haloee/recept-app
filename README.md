# Recept App – Fejlesztői dokumentáció

> **Verzió:** 0.1 • **Dátum:** 2025‑04‑19

## 1. Áttekintés
A **Recept App** egy SvelteKit 2‑es (Svelte 5) alapú webalkalmazás, amely a [Spoonacular API](https://spoonacular.com/food-api) segítségével recepteket keres, valamint MySQL adatbázisban (Drizzle ORM‑mel) kezelt bevásárlólistát biztosít a felhasználóknak.

Fő funkciók:
- Receptkeresés kulcsszó alapján, részletes nézettel
- Népszerű receptek listája
- Felhasználói bevásárlólista (CRUD)
- Reszponzív, Bootstrap‑alapú felület (kártyarács + navigáció)

## 2. Technológiai stack
| Réteg | Könyvtár / eszköz |
|-------|------------------|
| **Frontend** | Svelte 5 + SvelteKit 2.20.x |
| **Stílus** | Bootstrap 5 (CDN) |
| **Backend** | SvelteKit endpoints (+server.ts) |
| **Adatbázis** | MySQL 8.x, Drizzle ORM |
| **API‑integráció** | Spoonacular REST API |
| **Típusok** | TypeScript everywhere |

## 3. Könyvtárstruktúra
```
recept-app/
├─ src/
│  ├─ lib/
│  │  ├─ components/     # Újrafelhasználható UI‑elemek
│  │  └─ server/
│  │     └─ db/          # Drizzle séma + kapcsolat
│  ├─ routes/
│  │  ├─ api/            # Backend REST végpontok
│  │  │  ├─ recipes/     # Receptkeresés + részletek
│  │  │  └─ shopping-list/ # Bevásárlólista CRUD
│  │  ├─ popular/        # UI oldal
│  │  ├─ recipes/        # Dinamikus receptoldal
│  │  └─ shopping-list/  # Bevásárlólista UI
│  ├─ app.html           # Szokásos SvelteKit shell
│  └─ app.d.ts           # Locals típusbővítés
├─ drizzle.config.ts     # Migráció‑generálás
├─ package.json
└─ .env.example
```

## 4. Telepítés & futtatás
1. **Klónozás:**
   ```bash
   git clone https://github.com/haloee/recept-app.git
   cd recept-app
   ```
2. **Függőségek:**
   ```bash
   npm install  # vagy pnpm install
   ```
3. **Környezeti változók** (`.env` – lásd `.env.example`):
   ```env
   DATABASE_URL=mysql://user:pass@localhost:3306/recept_db
   SPOONACULAR_API_KEY=XXXXXXXX
   ```
4. **Adatbázis inicializálás:**
   ```bash
   npx drizzle-kit generate:mysql
   npx drizzle-kit push:mysql
   ```
5. **Fejlesztői szerver:**
   ```bash
   npm run dev -- --open
   ```

## 5. Adatbázis‑séma (Drizzle)
| Tábla | Oszlop | Típus | Megjegyzés |
|-------|--------|-------|------------|
| **users** | id | int PK | Auto‑increment |
|           | name | varchar(255) |  |
|           | email | varchar(255) UNIQUE |  |
|           | created_at | timestamp DEFAULT NOW | |
| **shopping_list** | id | int PK |  |
|                  | user_id | int FK → users.id | cascade delete |
|                  | ingredient_name | varchar(255) |  |
|                  | quantity | float | mennyiség |
|                  | unit | varchar(50) DEFAULT "" | mértékegység |
|                  | added_at | timestamp DEFAULT NOW | |

## 6. REST API végpontok
| Módszer | Útvonal | Query/body | Válasz |
|---------|---------|-----------|--------|
| GET | `/api/recipes?query=tomato` | – | { title, image, id, … }[ ] |
| GET | `/api/recipes?id=123` | – | Részletes recept (Spoonacular raw) |
| GET | `/api/shopping-list` | – | ShoppingListItem[ ] |
| POST | `/api/shopping-list` | `{ ingredientName, quantity, unit }` | `{ success: true }` |
| DELETE | `/api/shopping-list` | `{ id }` | `{ success: true }` |

## 7. Frontend oldalak & komponensek
- **`+page.svelte` (gyökér):** Keresőmező + `RecipeGrid`
- **`recipes/[id]/+page.svelte`**: `RecipeDetails`
- **`popular/+page.svelte`**: Top 10 recept rácsban
- **`shopping-list/+page.svelte`**: Lista + űrlap (összetevők hozzáadása)

### Kiemelt UI‑komponensek
| Fájl | Feladat |
|------|---------|
| `NavBar.svelte` | Főmenü navigáció |
| `SearchBar.svelte` | Spoonacular kereső input |
| `RecipeCard.svelte` | Egy recept kártyája |
| `RecipeGrid.svelte` | Receptkártyák rácsa |
| `RecipeDetails.svelte` | Összetevők, instrukciók |
| `LoadingSpinner.svelte` | Async indikátor |
| `Footer.svelte` | Lábléc |


## 8. Build & deploy
```bash
npm run build     # statikus + SSR bundle a .svelte-kit/output könyvtárba
npm run preview   # helyi pr
```
- **Adapter:** Alapértelmezetten nincs adapter beállítva. Válassz `@sveltejs/adapter-node`‑ot (klasszikus backend) vagy `@sveltejs/adapter-vercel`‑t (edge/funkció) a célplatformtól függően.


