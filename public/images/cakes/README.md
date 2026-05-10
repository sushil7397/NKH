# Cake images

Drop your cake photos in this folder. They will be served by Vite at
`/images/cakes/<filename>` — reference that path from the admin form's "Image URL"
field, or directly in `src/data/cakes.js` (`image: '/images/cakes/your-file.jpg'`).

## Recommended specs

- **Format:** `.jpg` (or `.webp` for smaller files)
- **Aspect ratio:** square (1:1) or 4:3 — both look good in cards
- **Size:** 800–1200 px on the long edge is plenty
- **Filename:** lowercase, hyphenated, descriptive
  (e.g. `red-velvet.jpg`, `bento-rose.jpg`, `jar-tiramisu.jpg`)

## Suggested folder layout

```
public/images/cakes/
├── cakes/         # full cakes
├── jar/           # jar cakes
└── bento/         # bento cakes
```

## How to swap the SVG placeholders for real photos

1. Save the photo into the right sub-folder.
2. Open `src/data/cakes.js` and add `image: '/images/cakes/<sub>/<file>'` to the
   relevant entry, e.g.
   ```js
   {
     id: 'red-velvet',
     title: 'Red Velvet Cream Cheese',
     image: '/images/cakes/cakes/red-velvet.jpg',
     // ...rest
   }
   ```
3. Save. The card and detail page will pick up the photo automatically.

If a referenced image fails to load, the styled SVG placeholder is shown instead
— so you can roll out images one cake at a time without breakage.
