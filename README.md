# Il Confine Azzurro — Sito Vetrina

Sito statico di presentazione appartamento vacanze a Gallipoli (LE), Puglia.

## Struttura file

```
/
├── index.html          Home page
├── galleria.html       Galleria fotografica
├── info.html           Info, posizione e contatti
├── css/
│   └── style.css       Stili centralizzati
├── js/
│   └── main.js         JavaScript condiviso (navbar, lightbox, scroll-reveal)
├── img/
│   ├── hero.jpg         Immagine hero della home (consigliato: min 1920×1080)
│   ├── chi-siamo.jpg    Foto sezione "Chi siamo" in info.html
│   ├── favicon.png      Icona browser (consigliato: 32×32 o 64×64)
│   └── gallery/
│       ├── soggiorno.jpg
│       ├── soggiorno-2.jpg
│       ├── cucina.jpg
│       ├── cucina-2.jpg
│       ├── camera-matrimoniale.jpg
│       ├── camera-letti.jpg
│       ├── camera-3.jpg
│       ├── bagno.jpg
│       ├── bagno-2.jpg
│       ├── terrazza.jpg
│       ├── terrazza-2.jpg
│       ├── esterno.jpg
│       └── esterno-2.jpg
└── fonts/
    ├── MebthoFrancy.woff2   Font decorativo (da aggiungere)
    └── MebthoFrancy.woff    Font decorativo (da aggiungere)
```

## Configurazione iniziale

### 1. Aggiungere le immagini
Inserisci le foto reali dell'appartamento nelle cartelle indicate sopra.
Formati consigliati: **JPEG** per foto, **WebP** per performance ottimali.
Dimensioni raccomandate gallery: **1200×900 px** (4:3).

### 2. Attivare il Google Calendar
In `index.html` sostituisci `YOUR_CALENDAR_ID` nell'URL dell'iframe con
l'ID del tuo Google Calendar pubblico:

```html
src="https://calendar.google.com/calendar/embed?src=TUO_ID%40group.calendar.google.com&..."
```

[Come trovare l'ID del calendario](https://support.google.com/calendar/answer/37083)

### 3. Aggiornare la mappa OpenStreetMap
In `info.html` aggiorna il `bbox` e il `marker` nell'URL dell'iframe con
le coordinate reali dell'appartamento:

```
bbox=LON_SW,LAT_SW,LON_NE,LAT_NE&marker=LAT,LON
```

[Generare l'embed da OpenStreetMap](https://www.openstreetmap.org/export)

### 4. Font personalizzato
Inserisci i file `MebthoFrancy.woff2` e `MebthoFrancy.woff` nella cartella `fonts/`.
Il `@font-face` è già dichiarato in `css/style.css`. Se il font non viene trovato
il sito usa *Cormorant Garamond* come fallback.

### 5. Aggiornare contatti e dati
Cerca e sostituisci in tutti i file HTML:

| Placeholder | Valore reale |
|---|---|
| `+39 333 123 4567` | Numero di telefono/WhatsApp |
| `393331234567` | Numero WhatsApp (formato internazionale, senza +) |
| `info@ilconfineazzurro.it` | Indirizzo email |
| `Via del Mare, 12` | Indirizzo reale |
| `Gallipoli` / `73014` / `LE` | Città, CAP, provincia |
| `ilconfineazzurro` | Handle Instagram |
| `www.ilconfineazzurro.it` | Dominio reale (per OG e Schema.org) |

### 6. Aggiornare sitemap.xml
Sostituisci `https://www.ilconfineazzurro.it` con il dominio reale pubblicato.

## Avvio locale

Apri `index.html` direttamente nel browser oppure usa un server locale
per evitare problemi con i path relativi:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

## Note tecniche

- **Nessun framework** — HTML5, CSS custom properties, JS vanilla ES6+
- **Font Google** caricati via CDN: *Cormorant Garamond* + *DM Sans*
- **Lightbox** solo su `galleria.html` (il JS verifica la presenza dell'elemento)
- **Bottom bar** visibile su desktop, nascosta su mobile (`max-width: 640px`)
- **Scroll reveal** via `IntersectionObserver` su `.fade-in-section`
- **Navbar auto-hide** su scroll verso il basso, ripristinata su scroll verso l'alto
