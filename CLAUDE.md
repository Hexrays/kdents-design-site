# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple, standalone portfolio website for Katie Denton. It's a single HTML file with embedded CSS - no build system, no dependencies, completely maintenance-free.

## Making Changes

### Update Content
Edit [index.html](index.html) directly:

1. **Bio text**: Around line 190, in the `<p>` tag after "katie denton"
2. **Email**: Around line 197, in the `<a href="mailto:...">` tag
3. **Job title/company**: Around line 190, in the link and text mentioning Doberman

Look for HTML comments that say `<!-- UPDATE: ... -->` to find editable sections easily.

### Update Styles
Styles are embedded in the `<style>` tag in the HTML head (lines 27-168). The CSS is plain, modern CSS - no preprocessors.

**Key style features**:
- **Viewport-based typography**: `font-size: 5vw` for responsive text sizing
- **Hover color**: `#14EEB1` (mint green) on links
- **Font**: `futura-pt` loaded from Adobe Typekit
- **Mobile breakpoint**: `@media (max-width: 767px)` adjusts line-height
- **Emoticon animation**: Pure CSS hover effect on the `<ul>` ASCII art

### Emoticon ASCII Art
The site features a clever ASCII emoticon `---)` made with `<ul><li><i>` tags. On hover, the `)` rotates 90° to create a wink effect. This is pure CSS - no JavaScript needed.

## Deployment

This is a static HTML file. Deploy to S3 or any static hosting:

**AWS S3** (current hosting):
1. Upload `index.html` and `favicon.ico` to your S3 bucket
2. Ensure bucket is configured for static website hosting
3. No build step required

**Alternative hosting**:
- GitHub Pages: Push to `gh-pages` branch
- Netlify: Drag and drop the files
- Vercel: Deploy the directory
- Any static host: Upload `index.html` and `favicon.ico`

## File Structure

```
/
├── index.html          # Standalone site (HTML + embedded CSS)
├── favicon.ico         # Site favicon
├── CLAUDE.md           # This file
├── README.md           # Project documentation
├── MODERNIZATION_PLAN.md  # Plan for converting from Gulp to standalone
└── legacy/             # Old build system files (preserved for reference)
    └── images/         # Portfolio images and resume PDF
```

## Legacy Files

The `legacy/` directory contains images from the old version of the site, including portfolio slides and a resume PDF. The old Gulp-based build system has been completely removed in favor of this simple, maintainable static file.

The old system had:
- Gulp 3.x build pipeline with Browserify and Babel
- SCSS compilation with numerous partials
- Commented-out slider functionality
- Multiple unused CSS and JavaScript files

This was all replaced with a single 200-line HTML file that's easy to edit and deploy.

## External Dependencies

The site uses two external services:

1. **Adobe Typekit** (Kit ID: tgu8cpx)
   - Loads the `futura-pt` font family
   - Script in the `<head>` adds `.wf-loading` class while loading
   - Sections are hidden until font loads for better UX

2. **Google Analytics** (UA-44581526-8)
   - Tracking code at the bottom of `<body>`
   - Update tracking ID if needed

Both scripts are preserved exactly from the original site.
