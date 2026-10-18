# Kingdom Creative — Website Demo

A responsive Kingdom Creative website with a dimmed high-resolution technology/circuit-board background, layered navy overlays, subtle cyan/violet glow effects, and gold brand accents. The content panels remain dark and readable while the background adds depth.

## Files
- `index.html` — semantic page structure and sections
- `styles.css` — responsive visual design and mobile navigation layout
- `app.js` — navigation, service detail modals, contact form demo behaviour, dynamic rendering
- `data.js` — editable mock content for services, process steps and impact areas
- `assets/` — place your brand logo here

## Preview
1. Extract the ZIP.
2. Open `index.html` in a modern browser. For the best local development experience, use VS Code with the Live Server extension.
3. Replace the built-in text/monogram mark in the header and footer with your logo image if desired.

## Add your logo
Put your image in `assets/`, for example `assets/logo.jpg`. In `index.html`, replace each `.brand-mark` element with:
```html
<img class="brand-logo" src="assets/logo.jpg" alt="Kingdom Creative logo">
```
Then add this to `styles.css`:
```css
.brand-logo { width: 48px; height: 48px; object-fit: contain; }
```
If your logo has a transparent background, PNG or SVG may look best. Keep the image file name and path consistent.

## Customise
Edit `data.js` to update service titles, summaries, deliverables, process steps and impact areas. Service cards and the contact form's service dropdown are rendered from this file.

## Important demo notes
- The enquiry form validates input and displays a local confirmation only. It does not email or store enquiries.
- The security service is framed as a permission-based digital risk review. Only conduct technical testing with written authorisation and an agreed scope.
- Technology and workplace photographs are loaded from Unsplash for the hero, diagnostic feature, and six service cards; an internet connection is required to load them. Dark navy overlays keep text readable, while cyan/violet glow effects are CSS-only. Google Fonts are also loaded from the internet.
- This is a front-end prototype, not a production CMS or backend. Before launch, connect the contact form, add privacy/terms information, test accessibility, and review all service claims.


## Immersive visuals and interactions
- Every major page division now has its own dimmed, technology/business-relevant photographic background, with overlays to preserve text contrast.
- Service cards have individual contextual images, reveal on scroll, respond to hover/touch, and open their service detail modal.
- Added scroll progress, active-section navigation, subtle pointer lighting, click ripples, and a gentle diagnostic illustration response.
- Images are loaded from Unsplash and therefore require an internet connection. Reduced-motion preferences are respected.
