# Pancita

Pancita is a mobile-first PWA habit and nutrition companion built with a warm, native-app feel. The MVP focuses on the polished frontend: mock login, daily nutrition overview, playful food logging, guided recipes, cosmetic personalization, profile settings, persisted client state, and a Three Fiber Pancita character fallback.

## Tech Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Zustand with localStorage persistence
- React Three Fiber / Three.js for the Pancita character surface
- Framer Motion for screen transitions and microinteractions
- Web App Manifest metadata for PWA install support

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js, usually [http://localhost:3000](http://localhost:3000).

## Current Limitations

- Authentication is mocked. All login options enter the app as Diego.
- Nutrition values, weekly summary, recipe recommendations, points, and profile data are local mock data.
- State is persisted in `localStorage`, not a backend.
- Profile setting screens save simple local preferences only.
- No medical calculations or clinical advice are implemented.

## 3D Assets

The app is ready for real GLB assets. Until they exist, `PancitaScene` renders a Three.js geometry fallback.

Place the main model here:

```txt
public/models/pancita.glb
```

Place accessory models here:

```txt
public/models/accessories/beanie-verde.glb
public/models/accessories/gorra-rosa.glb
public/models/accessories/sombrero-pana.glb
public/models/accessories/anteojos-redondos.glb
public/models/accessories/panuelo-triangulo.glb
public/models/accessories/auriculares-lila.glb
public/models/accessories/piluso-smile.glb
public/models/accessories/mochilita-mini.glb
public/models/accessories/vincha-brote.glb
```

## PWA Support

PWA configuration lives in:

- `app/manifest.ts`
- `app/layout.tsx`
- `public/icons/`

The manifest uses `display: "standalone"`, Pancita app names, warm cream background color, olive theme color, portrait orientation, and placeholder install icons.

## Main Workflows

- First entry: `/login` stores a mock session and routes into `/home`.
- Food logging: `/diario` lets the user tap or drag foods into Pancita, updates diary totals, emotion, and points.
- Recipe discovery: `/cocina` shows Modo Chef recommendations and recipe cards.
- Recipe completion: `/cocina/[recipeId]/pasos` guides seven steps and can add the recipe to the diary.
- Personalization: `/personalizacion` supports buying, owning, equipping, and unequipping accessories.
- Profile configuration: `/perfil` and `/perfil/configuracion` show user data, goals, settings, logout, and delete-confirmation UI.
