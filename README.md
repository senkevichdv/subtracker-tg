# TG Subtracker

A Telegram Mini App for tracking subscriptions, built with Next.js, TypeScript, Material UI, and localStorage. Integrates with Telegram's Mini App JS API for user info and theming.

## Features
- Add, edit, delete subscriptions
- LocalStorage for data persistence
- Material UI with dark/light theme (auto from Telegram)
- Russian language only
- Telegram user info integration
- Settings: currency, theme
- About screen
- (Future) Backend/database support

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

4. **Deploy as a Telegram Mini App:**
   - Host the app (e.g., Vercel, Netlify)
   - Set the URL in your Telegram bot's Mini App settings

## Project Structure

- `pages/` — Next.js pages (routes)
- `components/` — Reusable UI components
- `contexts/` — React contexts for subscriptions, settings, notifications
- `utils/` — Utility functions (e.g., currency, Telegram API)
- `locales/` — Russian translation file

## Telegram Mini App Integration
- Uses Telegram WebApp JS API for user info and theme
- See `utils/telegram.ts` for integration

## License
MIT 