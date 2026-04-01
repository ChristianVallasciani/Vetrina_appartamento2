# Scheda Tecnica Sito

## 1) Panoramica progetto

- **Nome progetto:** Il Confine Azzurro
- **Tipologia:** sito vetrina statico (no backend, no CMS)
- **Obiettivo:** presentazione appartamento, galleria fotografica, contatti e conversione prenotazioni
- **Lingua:** italiano (`lang="it"`)
- **Struttura principale:** 3 pagine HTML con stile centralizzato e script condiviso

## 2) Struttura informativa e navigazione

### Pagine

- `index.html` (Home)
  - Hero + value proposition
  - Caratteristiche
  - Anteprima foto
  - Disponibilita (Google Calendar embed)
  - Contatti rapidi con CTA
- `galleria.html` (Galleria)
  - Sezioni foto per ambienti
  - Lightbox interattiva
  - CTA finale a prenotazione/WhatsApp
- `info.html` (Info & Contatti)
  - Posizione e mappa
  - Contatti (telefono, email, WhatsApp, indirizzo)
  - Sezione istituzionale "Chi siamo"
  - CTA Instagram

### Navigazione

- Navbar fissa condivisa su tutte le pagine
- Link interni principali: Home, Galleria, Info & Contatti
- Stato attivo di pagina via classe `nav-active`
- Versione mobile con menu collassabile (`.nav-toggle` + `.nav-links.open`)

## 3) Architettura tecnica

### Tecnologie

- **Markup:** HTML5 semantico
- **Stili:** CSS custom in file unico `css/style.css`
- **Comportamento:** JavaScript vanilla in `js/main.js`
- **Font esterni:** Google Fonts (`Cormorant Garamond`, `DM Sans`)
- **Font locale custom:** `@font-face` (`Mebtho Francy`)

### Organizzazione file

- `index.html`
- `galleria.html`
- `info.html`
- `css/style.css`
- `js/main.js`
- `README.md` (minimale)

## 4) Componenti UI e pattern UX

- **Navbar floating** con effetto blur e auto-hide on scroll (`#navbar.nav-hidden`)
- **Sistema CTA** multi-livello:
  - primaria (`.btn-primary`)
  - secondaria (`.btn-outline`)
  - contestuale WhatsApp (`.btn-whatsapp`)
- **Card interattive** per contatti e informazioni (`.contact-card`, `.cta-contact-card`)
- **Gallery grid responsive** con elemento hero e overlay caption
- **Lightbox** con:
  - apertura click immagine
  - navigazione prev/next
  - chiusura su overlay o ESC
  - supporto frecce tastiera
- **Scroll reveal** sezioni (`.fade-in-section` + IntersectionObserver)

## 5) Integrazioni esterne

- **Google Calendar embed** (sezione disponibilita)
- **OpenStreetMap embed** (sezione posizione)
- **WhatsApp deep link** (`wa.me` con testo precompilato)
- **Telefono** (`tel:`)
- **Email** (`mailto:`)
- **Instagram** (link esterno profilo)
- **Google Maps** (link esterno indirizzo)

## 6) Responsive design

### Breakpoint principali

- `@media (max-width: 900px)` adattamenti layout medi
- `@media (max-width: 700px)` adattamento CTA grid contatti
- `@media (max-width: 640px)` mobile principale (navbar, hero, gallery, CTA)
- breakpoint minori specifici (es. feature grid)

### Comportamenti mobile

- Navbar trasformata in menu a scomparsa
- CTA e bottoni in colonna dove necessario
- Griglie (gallery/preview/contatti) convertite a 1 colonna
- Rimozione barra fissa di chiamata/WhatsApp in fondo pagina (UX più pulita)

## 7) Accessibilita (stato attuale)

### Presente

- `meta viewport`
- `alt` immagini presenti nella maggior parte dei casi
- `aria-label` su controlli principali (menu, controlli lightbox)
- Focus style visibile via `:focus-visible`

### Da migliorare

- Alcune CTA e link con solo emoji andrebbero rinforzate con testo sempre descrittivo
- Potenziale aumento contrasto in alcune aree su sfondi fotografici
- Verifica completa semantica heading hierarchy (h1/h2/h3) per tutte le sezioni

## 8) Performance (stato attuale)

### Positivi

- Sito statico senza framework/runtime pesanti
- `loading="lazy"` su immagini e iframe
- JS leggero e modulare in un unico file

### Rischi / attenzioni

- Asset immagini non presenti nella cartella workspace corrente (riferimenti esistono in HTML/CSS ma file non rilevati)
- Hero CSS punta a `../img/hero.jpg` (da verificare presenza reale)
- Mancanza pipeline automatica (minify, compressione, auditing)

## 9) SEO On-page (stato attuale)

### Presente

- `title` personalizzato per ogni pagina
- Struttura contenuti leggibile e orientata all'intento utente
- Testi CTA chiari e orientati alla conversione

### Raccomandazioni

- Aggiungere `meta description` su tutte le pagine
- Inserire Open Graph/Twitter card
- Valutare dati strutturati schema.org (es. `LodgingBusiness` / `LocalBusiness`)
- Generare sitemap.xml e robots.txt se il sito viene pubblicato su dominio

## 10) Sicurezza e robustezza

- Link esterni con `target="_blank"` e `rel="noopener noreferrer"` correttamente presenti
- Nessuna logica sensibile lato client
- Rischio principale: rottura UX in caso di asset mancanti (immagini/font)

## 11) Manutenibilita

- Progetto semplice da mantenere per team piccoli/non tecnici
- CSS centralizzato e naming coerente a blocchi
- Script condiviso e riutilizzabile su tutte le pagine
- Consigliato split futuro CSS in moduli (`base`, `layout`, `components`, `pages`) in caso di crescita

## 12) Criticita prioritarie e prossimi step

### Priorita alta

1. Verificare e riallineare percorso reale di tutte le cartelle asset (immagini/font/logo/hero).
2. Aggiungere `meta description` e metadati social.
3. Eseguire controllo Lighthouse (mobile/desktop) e correggere criticita principali.

### Priorita media

1. Rifinire accessibilita (contrast ratio e labeling completo dei controlli).
2. Ottimizzare peso immagini (WebP/AVIF + dimensioni responsive).
3. Introdurre checklist QA pre-pubblicazione.

### Priorita bassa

1. Valutare build leggera (minify CSS/JS).
2. Inserire analytics/event tracking CTA (GA4 o equivalente).
3. Predisporre eventuale pagina privacy/cookie se necessaria per pubblicazione.

