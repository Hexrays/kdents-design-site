# Katie Denton - Portfolio Site

A minimalist portfolio website for Katie Denton, Design Director.

## About

This is a simple, standalone HTML file with no build system or dependencies. The entire site is a single `index.html` file with embedded CSS - just open it in a browser and it works.

## Making Changes

### Update Content

1. Open `index.html` in any text editor
2. Look for HTML comments that say `<!-- UPDATE: ... -->`
3. Edit the text in those sections:
   - Bio paragraph (job title, company, description)
   - Email address
   - ASCII emoticon (if you're feeling creative!)
4. Save and reload in browser

### Update Styles

The CSS is embedded in the `<style>` tag within `index.html` (lines 27-168). Edit directly - no compilation needed.

**Key styling**:
- Responsive typography using viewport units (`5vw`)
- Mint green hover color (`#14EEB1`)
- Mobile breakpoint at 767px
- Clever CSS-only emoticon hover animation

## Deployment

This site is currently hosted on **AWS S3** as a static website.

### Deploy to S3

1. Upload `index.html` and `favicon.ico` to your S3 bucket
2. That's it - no build step required!

### Alternative Hosting

You can also deploy to:
- **GitHub Pages**: Push to a `gh-pages` branch
- **Netlify**: Drag and drop the files into Netlify
- **Vercel**: Deploy the directory
- **Any web host**: Just upload the two files

## Features

- **Zero dependencies**: No npm, no build system, no frameworks
- **Single file**: Everything you need is in one HTML file
- **Fast loading**: Minimal CSS, no JavaScript
- **Accessible**: Semantic HTML with proper ARIA where needed
- **Responsive**: Works on all screen sizes
- **Fun details**: ASCII art emoticon with CSS hover animation

## Technical Details

- **Font**: Adobe Typekit (`futura-pt`)
- **Analytics**: Google Analytics (UA-44581526-8)
- **No JavaScript**: All interactivity is pure CSS
- **File size**: ~6KB (excluding external scripts)

## Project History

This site was previously built with:
- Gulp 3.x build pipeline
- SCSS preprocessor with 12+ partials
- Browserify + Babel for ES6 transpilation
- Commented-out React slider component
- 40+ npm dependencies

**It has been modernized** to a single HTML file for easier maintenance and deployment. Old files are preserved in the `legacy/` directory.

See [MODERNIZATION_PLAN.md](MODERNIZATION_PLAN.md) for details on the conversion process.

## Questions?

For questions about editing this site, check [CLAUDE.md](CLAUDE.md) which has detailed instructions for future maintainers.
