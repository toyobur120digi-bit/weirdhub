# WeirdHub.site — Production-Ready Static Blog Starter

A clean, fast, accessible, vanilla HTML/CSS/JS starter template for a weird facts blog site.

## Features
- Clean folder-per-page structure for pretty URLs (`/about/`, `/blogs/stars/`, etc.)
- Fully responsive, mobile-first design
- Light/Dark mode with system preference + manual toggle + localStorage
- Shared navbar & footer loaded via vanilla JS (`components.js`)
- Active navigation highlighting
- Mobile hamburger menu
- Semantic HTML5 + accessibility (aria labels, alt text)
- Modular CSS (components, home, blog-category, blog-post, page)
- No frameworks, no Tailwind, no jQuery — pure vanilla
- Blocky design (no border-radius except on buttons)
- Hover effects limited to background color change on cards
- Full SEO: canonicals, Open Graph, meta descriptions, sitemap.xml, robots.txt
- PWA-ready manifest.webmanifest
- Custom 404 page
- Demo content across 3 categories with 2 posts each (6 single posts total)
- JSON sample structure included for future dynamic use
- GitHub Pages compatible (use absolute URLs or adjust base)

## Folder Structure
```
weirdhub/
├── index.html                 # Homepage
├── about/index.html
├── contact-us/index.html
├── privacy-policy/index.html
├── blogs/
│   ├── index.html
│   ├── stars/
│   │   ├── index.html
│   │   ├── sunny-leone/index.html
│   │   └── deepika-padukone/index.html
│   ├── places/
│   │   ├── index.html
│   │   ├── bermuda-triangle/index.html
│   │   └── area-51/index.html
│   └── history/
│       ├── index.html
│       ├── voynich-manuscript/index.html
│       └── dancing-plague/index.html
├── components/
│   ├── navbar.html
│   └── footer.html
├── css/
│   ├── components.css
│   ├── home.css
│   ├── blog-category.css
│   ├── blog-post.css
│   └── page.css
├── js/
│   └── components.js
├── json/
│   └── blogs.json             # Sample data structure
├── assets/images/             # Add your images here (currently using picsum)
├── 404.html
├── favicon.svg
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── humans.txt
└── README.md
```

## How to Deploy on GitHub Pages
1. Create a new repo (or use existing)
2. Push this folder contents to `main` branch (or `gh-pages`)
3. Go to repo Settings → Pages → Deploy from branch
4. Set custom domain to `weirdhub.site` in your DNS + GitHub settings

## Customization Tips
- Replace all demo content with your own
- Add more posts by copying a single post folder structure
- Update `json/blogs.json` and build a simple JS renderer if you want dynamic category pages later
- Change accent color in `components.css` (search for `--accent`)
- Update navbar/footer links in `components/` files (all absolute URLs)
- For local testing: use `python -m http.server` or Live Server extension

## Tech Stack
- HTML5 + CSS3 + Vanilla ES6 JavaScript
- No build tools required
- Fully static — works everywhere

Built as a production-ready starter template by Grok (xAI) for weirdhub.site.

Enjoy exploring the weird side of reality! 🌀
