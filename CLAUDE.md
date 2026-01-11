# CLAUDE.md - Projektdokumentation

## Projektübersicht

**Projekt:** Persönliche Website für Jens Décieux
**Domain:** decieux.de
**Hosting:** Vercel
**Datenbank:** Vercel Postgres (geplant)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Bundler:** Turbopack
- **Deployment:** Vercel
- **Paketmanager:** npm

## Projektstruktur

```
jdec/
├── src/
│   └── app/           # Next.js App Router
├── public/            # Statische Assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Entwicklungskommandos

```bash
npm run dev      # Entwicklungsserver starten (mit Turbopack)
npm run build    # Produktionsbuild erstellen
npm run start    # Produktionsserver starten
npm run lint     # ESLint ausführen
```

## Inhaber / Kontakt

**Jens Décieux**
- Rechtsanwalt mit Fokus auf Legal Technology
- Kernthemen: Legal Tech, KI im Recht, pragmatische Lösungen

## Design-Richtlinien

- Modernes, dunkles Theme (basierend auf bestehender Website)
- Clean und minimalistisch, aber nicht langweilig
- Mobile-first Responsive Design
- Fokus auf Performance und Accessibility

## Geplante Features

- [ ] Hero-Sektion mit animiertem Hintergrund
- [ ] Über mich / Expertise Bereich
- [ ] Projekte / Portfolio
- [ ] Blog (optional, mit Datenbank)
- [ ] Kontaktformular
- [ ] Impressum & Datenschutz (rechtlich erforderlich)

## Umgebungsvariablen

Für Vercel Postgres werden folgende Variablen benötigt (später hinzufügen):

```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

## Deployment

Das Projekt wird automatisch über Vercel deployed:
- Push zu `main` → Production Deployment
- Push zu anderen Branches → Preview Deployment
