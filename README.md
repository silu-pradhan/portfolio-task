# Professional Portfolio Website

## Project Overview

This project is a personal portfolio website built with:

- HTML
- CSS
- JavaScript

It is designed to present a portfolio in a clean and professional way.  
The website includes:

- Home section
- Skills section
- Projects section
- Contact section

The portfolio is responsive, so it works across desktop, tablet, and mobile devices.

---

## Simple Project Explanation

This is a front-end portfolio website for showing personal details, technical skills, projects, and contact information.

Visitors can:

- view the home section
- see the skills section
- explore the projects section
- send a message using the contact form

All portfolio content is loaded directly from the JavaScript data file.

---

## Project System Design

This project is a static front-end portfolio.

### Portfolio side

The visitor opens the portfolio website and sees:

- profile information
- skills
- projects
- contact form

### Contact flow

1. The visitor fills in the contact form.
2. The form validates the inputs.
3. The website opens the user's email app using `mailto:`.
4. A success message is shown to the user.

### Data handling

The portfolio content is loaded from the static JavaScript data file.  
The project does not depend on browser `localStorage`.

Important note:

This project does not use a backend or database.  
It is suitable for personal portfolio demos, static hosting, and local use.

---

## File Structure

```text
New project/
├── index.html
├── README.md
├── assets/
│   ├── .gitkeep
│   ├── profile-photo.jpeg
│   └── profile-portrait.svg
├── css/
│   ├── animations.css
│   ├── base.css
│   ├── contact.css
│   ├── header.css
│   ├── hero.css
│   ├── projects.css
│   ├── responsive.css
│   ├── skills.css
│   └── style.css
└── js/
    ├── data.js
    ├── main.js
    ├── portfolio-app.js
    ├── portfolio-dom.js
    ├── portfolio-icons.js
    ├── portfolio-interactions.js
    └── portfolio-render.js
```

---

## Important Files

### HTML

- `index.html`  
  Main portfolio page

### CSS

- `style.css`  
  Main CSS entry file

- `base.css`  
  Global styles, theme colors, layout base

- `header.css`  
  Navbar styles

- `hero.css`  
  Home section styles

- `skills.css`  
  Skills section styles

- `projects.css`  
  Projects section styles

- `contact.css`  
  Contact section styles

- `animations.css`  
  Animation and motion styles

- `responsive.css`  
  Responsive behavior for different screen sizes

### JavaScript

- `data.js`  
  Stores the static portfolio data

- `main.js`  
  Main entry file

- `portfolio-app.js`  
  Starts the portfolio application

- `portfolio-dom.js`  
  Selects and manages DOM elements

- `portfolio-icons.js`  
  Skill icons

- `portfolio-interactions.js`  
  Navigation, cursor, reveal, and form interactions

- `portfolio-render.js`  
  Renders content into the page

---

## Features

- Responsive portfolio layout
- Professional UI design
- Skills with icons
- Animated project cards
- Custom cursor effect
- Smooth section reveal animations
- Creative background motion
- Contact form validation
- Static JavaScript-based portfolio content

---

## How To Run

Open:

- `index.html`

in a browser.

---

## Future Improvement Ideas

- Add backend and database
- Add real email sending for contact form
- Add project thumbnails and live demo links
- Add downloadable resume section
- Add real contact API integration
