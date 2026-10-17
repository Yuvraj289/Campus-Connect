# CampusConnect — Project Starter

A multi-college event discovery platform for Tamil Nadu colleges. This is the
Phase 1 homepage build: static HTML/CSS/JS with mock data, ready to be wired
up to a real backend (Supabase/Firebase) next.

## What's in here

```
campusconnect-app/
├── index.html          Homepage markup
├── css/style.css        Editorial "campus wire" design system
├── js/app.js             Renders events/colleges from data/events.json
└── data/events.json      Mock event + college data (swap for real API later)
```

## Design direction

Newspaper/wire-service aesthetic: cream paper background, near-black ink,
a masthead red accent, and a mustard-gold secondary. Headlines in Fraunces
(serif), body text in Inter, and data labels (dates, tags, categories) in
Space Mono — like wire-service timestamps.

Signature element: the "On the wire today" ticker strip, showing which
colleges are actively publishing events — this doubles as a real trust
signal once the platform has live colleges on it.

## How to preview it locally

No build step needed — it's plain HTML/CSS/JS.

1. Open a terminal in this folder
2. Run: `python3 -m http.server 8000`
3. Open `http://localhost:8000` in your browser

(Opening `index.html` directly by double-clicking also works, but a local
server avoids any fetch/CORS quirks when loading `events.json`.)

## What's already working

- Search bar (filters by title, college, category)
- Category filter pills (Fest / MUN / Hackathon / Workshop / Cultural)
- Featured/top-story event section
- Event listings grid
- College directory grid
- Fully responsive down to mobile
- Keyboard focus states for accessibility

## Next steps (Phase 1 remaining)

1. **Submit Event form** — currently a placeholder alert; build a real form
   that writes to the backend with a "pending approval" status.
2. **Backend swap** — replace `data/events.json` fetch in `js/app.js` with
   a Supabase (or Firebase) query. The data shape is already designed to
   match a simple `events` + `colleges` table.
3. **Event detail page** — right now cards don't link anywhere; add
   `event.html?id=...` or a modal with the full description + registration
   link.
4. **Admin approval route** — a simple protected page to approve/reject
   submitted events before they go live.
5. **Seed real KCG events** — replace mock data with 5–10 real KCG/MUN/
   Twyntra events before sharing the link with anyone.

## Deploying

Push this folder to a GitHub repo, then connect it to Vercel for automatic
deployment — same workflow used on previous projects. No environment
variables are needed yet since there's no backend connected.
