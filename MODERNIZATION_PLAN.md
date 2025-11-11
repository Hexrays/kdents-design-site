# Site Modernization Plan: Convert to Standalone HTML/CSS

## Overview
Convert Katie Denton's portfolio site from a Gulp-based build system to a simple standalone HTML file with embedded or linked CSS. The goal is to create a maintenance-free static site that can be edited directly and deployed anywhere without build dependencies.

## Current State Analysis

### What's Actually Used
Based on analysis of `app/css/main.scss`, only these SCSS partials are imported:
1. ✅ `_reset.scss` - CSS reset (953 bytes)
2. ✅ `_fonts.scss` - Custom font loading (186 bytes)
3. ✅ `_constants.scss` - SCSS variables (162 bytes)
4. ✅ `_utils.scss` - SCSS mixins and utilities (5547 bytes)
5. ✅ `_global.scss` - Main styles (1847 bytes)

### What's Commented Out (Unused)
These partials exist but are NOT imported (commented out in main.scss):
- ❌ `_wallop.scss` - Slider plugin styles
- ❌ `_hero.scss` - Hero section styles
- ❌ `_slider.scss` - Slider component styles
- ❌ `_about.scss` - About section styles
- ❌ `_exp.scss` - Experience section styles
- ❌ `_thoughts.scss` - Thoughts section styles
- ❌ `_footer.scss` - Footer section styles

### JavaScript Status
- `app/js/main.js` - Exists but slider code is commented out
- `app/js/slider.js` - Exists but never called
- `app/js/helpers/index.js` - Exists but never used
- **Conclusion**: No JavaScript is actually running on the site

### External Dependencies
1. **Adobe Typekit** - Loads 'futura-pt' font family (used in CSS)
2. **Google Analytics** - Tracking code for UA-44581526-8
3. **Custom Font** - BerlingskeSerif-Blk.otf (280KB, defined but NOT used in current styles)

### Site Content
The HTML (`app/index.html`) contains:
- ASCII art emoticon made with `<ul><li>` and `<i>` tags: `--)` with hover animation
- H1 with Katie's name ("katie denton")
- Bio paragraph mentioning Doberman NY
- Email link: katie@kdents.design
- Google Analytics script
- Adobe Typekit script

## Implementation Plan

### Phase 1: Extract and Compile CSS

#### Task 1.1: Identify Required Styles
**File**: Create analysis of which SCSS features are actually used

**Analysis Required**:
1. Does `_global.scss` use any variables from `_constants.scss`?
   - Yes: `$hoverColor` is used in link hover styles (line 92 of _global.scss)

2. Does `_global.scss` use any mixins from `_utils.scss`?
   - Yes: `@include breakpoint(mb)` is used on line 19 for mobile styles

3. What is the compiled output of these SCSS features?
   - Need to convert SCSS variables to plain CSS values
   - Need to expand the breakpoint mixin to actual media query

**SCSS Features to Convert**:
- Variable `$hoverColor: #14EEB1` → Direct hex value in CSS
- Mixin `@include breakpoint(mb)` → `@media only screen and (max-width: 767px)`
- Nested selectors (e.g., `section { &:first-of-type }`) → Expanded CSS selectors

#### Task 1.2: Manual CSS Conversion Strategy
Since the build system is broken and we want to avoid fixing it, we'll manually convert SCSS to CSS:

**Conversion Steps**:
1. Take the 5 active SCSS partials in order
2. Replace all SCSS variables with their literal values:
   - `$hoverColor` → `#14EEB1`
   - `$serif` → `'BerlingskeSerif-Blk'` (though this isn't used)
   - `$monospace` → `'courier-prime', monospace` (though this isn't used)
3. Expand the one breakpoint mixin:
   - `@include breakpoint(mb) { line-height: 1.5; }`
   - Becomes: `@media only screen and (max-width: 767px) { body { line-height: 1.5; } }`
4. Flatten all nested selectors:
   - `section { &:first-of-type { padding-bottom: 0; } }`
   - Becomes: `section:first-of-type { padding-bottom: 0; }`
5. Remove the `_fonts.scss` font-face for BerlingskeSerif-Blk since it's defined but never used

**Note**: The `_utils.scss` file contains many mixins (flex helpers, position helpers, trig functions for circle layout), but only the `breakpoint()` mixin is actually used. We can discard all the other utilities.

### Phase 2: Create Standalone HTML

#### Task 2.1: Structure Decision
**Options**:
1. **Inline CSS** - Embed all CSS in a `<style>` tag in the HTML
   - Pros: Single file, no external dependencies
   - Cons: Slightly larger file, harder to edit styles

2. **Separate CSS file** - Create standalone `style.css` file
   - Pros: Cleaner separation, easier to edit
   - Cons: Two files to manage (minor)

**Recommendation**: Use Option 1 (Inline CSS) for maximum portability and simplicity.

#### Task 2.2: HTML File Creation
**New File**: `index.html` (in project root)

**Structure**:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Katie Denton - Design Director">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="google-site-verification" content="eBKOYHjR-M-2HVrcpHEDTfeRCiCodZGfk_PVNIwDTps">
    <title>Katie (Mangano) Denton</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- Adobe Typekit for futura-pt font -->
    <script>
      (function(d) { /* existing typekit code */ })(document);
    </script>

    <style>
      /* Compiled CSS goes here */
    </style>
  </head>
  <body>
    <!-- Existing content from app/index.html -->

    <!-- Google Analytics -->
    <script>
      (function(i,s,o,g,r,a,m){ /* existing GA code */ })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-44581526-8', 'auto');
      ga('send', 'pageview');
    </script>
  </body>
</html>
```

**Content to Preserve**:
- All meta tags (charset, description, viewport, google-site-verification)
- Adobe Typekit script (futura-pt font is used in CSS)
- Google Analytics script
- The emoticon ASCII art `<ul><li>` structure
- H1, paragraph, and email link
- Favicon reference

**Content to Update** (per user requirements):
- Bio text can be edited directly in the HTML
- Email link can be updated
- Title can be changed

#### Task 2.3: Asset Handling
**Files to Keep**:
1. `favicon.ico` - Referenced in HTML, copy to project root
   - Source: Currently exists at project root (4286 bytes)
   - Action: Already in correct location, no changes needed

**Files to Remove** (not needed):
1. `app/fonts/BerlingskeSerif-Blk.otf` - Font is defined but never used in active styles
2. `app/images/` - No images are referenced in the current HTML
3. All JavaScript files - No JS is running

### Phase 3: CSS Compilation Details

#### Task 3.1: Exact CSS Output
Here's the manual compilation of each section:

**From `_reset.scss`**:
```css
/* CSS Reset */
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block;
}

ol, ul {
  list-style: none;
}

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  border: 0;
  box-sizing: border-box;
  font-size: 100%;
  font: inherit;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
}

a {
  text-decoration: none;
  color: #000;
}
```

**From `_global.scss` (with SCSS features expanded)**:
```css
/* Global Styles */
html {
  font-size: 6.25%;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  position: relative;
  font-size: 14rem;
  line-height: 1.2;
  color: #000;
  background-color: #fff;
  overflow-x: hidden;
  font-family: 'futura-pt', sans-serif;
}

@media only screen and (max-width: 767px) {
  body {
    line-height: 1.5;
  }
}

.clearfix:after {
  display: table;
  clear: both;
  content: "";
}

.visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

img {
  width: 100%;
}

section {
  position: relative;
  width: 100%;
  padding: 20px 19% 20px 30px;
}

section:first-of-type {
  padding-bottom: 0;
}

.wf-loading section {
  display: none;
}

h1, p, a, li {
  font-size: 5vw;
  font-weight: 700;
  line-height: 1.2;
}

h1, p {
  display: inline;
}

p {
  padding-bottom: 1vh;
}

span {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

a {
  color: #000;
  text-decoration: underline;
  transition: background-color 0.25s;
}

a:hover,
a:focus,
a:active {
  background-color: #14EEB1;
}

ul {
  display: inline-block;
}

ul:hover li:nth-child(2) {
  transform: rotate(90deg) translatey(-18px) translatex(-13px);
  opacity: 1;
}

ul:hover li:first-child {
  letter-spacing: 5px;
}

ul:hover li i {
  transform: rotate(90deg);
}

li {
  line-height: 0.7;
}

li:first-child {
  letter-spacing: 0px;
}

li:nth-child(2) {
  position: relative;
  display: inline-block;
  transform: translatey(-18px) translatex(15px);
  opacity: 0;
  transition: all 0.25s;
}

i {
  transform-origin: 50% 50%;
  position: relative;
  display: inline-block;
  transition: all 0.25s;
}
```

#### Task 3.2: CSS Optimization Check
Review the compiled CSS for:
1. **Unused classes**:
   - `.clearfix` - Not used in HTML, can remove
   - `.visuallyhidden` - Not used in HTML, can remove
   - `img` styles - No images in HTML, can remove

2. **Font loading state**:
   - `.wf-loading section { display: none; }` - This is used! Typekit adds this class while fonts load

3. **Dead code**:
   - `span` selector hides the "denton" text with visually-hidden technique - this IS used for the name

**Final optimization**: Remove `.clearfix`, `.visuallyhidden`, and `img` rules.

### Phase 4: Testing & Validation

#### Task 4.1: Visual Comparison
Since we don't have a working build system, we'll validate by:

1. **Review the original design intent**:
   - Minimalist black and white design
   - Large viewport-based typography (5vw)
   - ASCII emoticon with hover animation
   - Mint green hover color (#14EEB1)
   - futura-pt font from Typekit

2. **Check critical styles are preserved**:
   - Emoticon animation (ul:hover transforms)
   - Responsive font sizing (5vw)
   - Hover color on links
   - Mobile breakpoint for line-height

3. **Manual testing checklist**:
   - [ ] Open in browser, verify layout looks minimal/clean
   - [ ] Hover over emoticon, verify rotation animation
   - [ ] Hover over links, verify mint green background
   - [ ] Test on mobile viewport (< 767px), verify line-height change
   - [ ] Verify futura-pt font loads from Typekit

#### Task 4.2: Functionality Check
- [ ] Favicon displays correctly
- [ ] Email link works (mailto:katie@kdents.design)
- [ ] External link to Doberman opens in new tab
- [ ] Google Analytics fires (check browser dev tools Network tab)
- [ ] Typekit loads successfully (check for .wf-active class on html element)

### Phase 5: Content Updates

#### Task 5.1: Identify Content to Update
**Current bio text**:
> "is the design director @Doberman ny. She is passionate about shipping products that shape our culture. She usually is working on top-secret projects so send her a note to learn more."

**Ask user**:
1. What should the new bio text say?
2. Should the company/link be updated?
3. Any other content changes needed?

**Easy-to-edit sections** (marked in HTML with comments):
```html
<!-- UPDATE: Change bio text here -->
<p> is the design director <a href="http://doberman.co/" target="_blank">@Doberman ny</a>. She is passionate about shipping products that shape our culture. She usually is working on top-secret projects so send her a note to learn more.</p>

<!-- UPDATE: Change email here -->
<a href="mailto:katie@kdents.design?subject=:)">katie@kdents.design</a>
```

### Phase 6: Cleanup & Documentation

#### Task 6.1: Create New Project Structure
**Final directory structure**:
```
/
├── index.html          (new standalone file)
├── favicon.ico         (existing, keep)
├── CLAUDE.md           (update with new instructions)
├── MODERNIZATION_PLAN.md (this file)
├── README.md           (create simple readme)
└── legacy/             (move old files here for reference)
    ├── app/
    ├── gulpfile.js
    ├── package.json
    ├── .babelrc
    ├── .bowerrc
    └── etc.
```

#### Task 6.2: Update CLAUDE.md
Replace contents with:

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple, standalone portfolio website for Katie Denton. It's a single HTML file with embedded CSS - no build system, no dependencies, completely maintenance-free.

## Making Changes

### Update Content
Edit `index.html` directly:

1. **Bio text**: Line ~38, in the `<p>` tag
2. **Email**: Line ~42, in the `<a href="mailto:...">` tag
3. **Job title/company**: Line ~38, in the link and text

### Update Styles
Styles are embedded in the `<style>` tag in the HTML head (lines ~24-XXX). The CSS is plain, modern CSS - no preprocessors.

**Key style features**:
- Viewport-based typography: `font-size: 5vw`
- Hover color: `#14EEB1` (mint green)
- Font: `futura-pt` loaded from Adobe Typekit
- Mobile breakpoint: `@media (max-width: 767px)`

## Deployment

This is a static HTML file. Deploy anywhere:
- GitHub Pages: Push to `gh-pages` branch
- Netlify: Drag and drop the file
- Vercel: Deploy the directory
- Any static host: Upload `index.html` and `favicon.ico`

No build step required.

## Legacy Files

The `legacy/` directory contains the old Gulp-based build system. It's kept for historical reference but is not used. The old system had:
- Gulp 3.x build pipeline
- SCSS compilation
- Browserify + Babel for ES6
- Commented-out slider functionality

This was all removed in favor of a simple, maintainable static file.
```

#### Task 6.3: Create Simple README
Create `README.md`:

```markdown
# Katie Denton - Portfolio Site

A minimalist portfolio website for Katie Denton, Design Director.

## About

This is a simple, standalone HTML file with no build system or dependencies. Edit the HTML directly to update content.

## Making Changes

1. Open `index.html` in any text editor
2. Find the section you want to change (bio, email, etc.)
3. Edit the text
4. Save and reload in browser

## Deployment

Upload `index.html` and `favicon.ico` to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

## Legacy

This site was previously built with Gulp, SCSS, and Browserify. It has been simplified to a single HTML file for easier maintenance. Old files are in the `legacy/` directory.
```

#### Task 6.4: Move Legacy Files
```bash
mkdir legacy
mv app legacy/
mv gulpfile.js package.json .babelrc .bowerrc .editorconfig .gitignore .jshintrc legacy/
mv node_modules legacy/ # if it exists
```

**Keep at root**:
- `index.html` (new)
- `favicon.ico` (existing)
- `CLAUDE.md` (updated)
- `README.md` (new)
- `MODERNIZATION_PLAN.md` (this file)
- `.git/` (Git history)

## Execution Order

1. **Create compiled CSS** (Phase 3)
   - Manually convert SCSS to CSS
   - Remove unused rules
   - Validate syntax

2. **Create new index.html** (Phase 2)
   - Copy HTML structure from `app/index.html`
   - Embed compiled CSS in `<style>` tag
   - Preserve all scripts (Typekit, Analytics)
   - Add HTML comments for easy editing

3. **Test in browser** (Phase 4)
   - Visual check
   - Hover interactions
   - Mobile responsiveness
   - External scripts loading

4. **Get content updates from user** (Phase 5)
   - Ask what bio text should say
   - Update accordingly

5. **Clean up project** (Phase 6)
   - Move legacy files
   - Create new documentation
   - Update CLAUDE.md

## Questions for User

Before implementation, please provide:

1. **Content Updates**:
   - What should the bio paragraph say?
   - Is the company/link still accurate (Doberman NY)?
   - Should the email address change?
   - Any other text changes needed?

2. **Preferences**:
   - Do you want the CSS inlined in the HTML, or as a separate `style.css` file?
   - Should we keep the old files in a `legacy/` folder, or delete them entirely?

3. **Deployment**:
   - Where will this be hosted? (affects any path changes needed)
   - Do you want a GitHub Pages setup, or just the raw files?

## Success Criteria

- [ ] Single `index.html` file works standalone in browser
- [ ] All original styles preserved (layout, typography, animations)
- [ ] No build system required
- [ ] Content easily editable by opening HTML in text editor
- [ ] Favicon displays correctly
- [ ] External scripts (Typekit, Analytics) still work
- [ ] Site looks identical to current design
- [ ] Bio text updated per user's requirements
- [ ] Clear documentation for future edits

## Risks & Mitigations

**Risk**: Can't verify compiled CSS matches current look since no build exists
**Mitigation**: Manual side-by-side testing in browser, careful SCSS-to-CSS conversion

**Risk**: Typekit or external scripts might break
**Mitigation**: Preserve exact script code, test in browser

**Risk**: Losing Git history if we delete too much
**Mitigation**: Keep `.git/`, move (don't delete) legacy files

## Estimated Effort

- Phase 1-3 (CSS compilation): 30 minutes
- Phase 2 (HTML creation): 15 minutes
- Phase 4 (Testing): 15 minutes
- Phase 5 (Content updates): 10 minutes
- Phase 6 (Cleanup & docs): 20 minutes

**Total**: ~90 minutes of focused work

## Additional Notes

- The site is currently using futura-pt from Adobe Typekit - this external dependency will remain
- Google Analytics tracking will be preserved
- The custom font file (BerlingskeSerif-Blk.otf) is NOT used in the current design and can be safely ignored
- All JavaScript is commented out in the current version - no interactivity beyond CSS hover states
- The emoticon hover animation is pure CSS and very clever - needs to be preserved exactly
