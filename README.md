# Professional Portfolio Website

## Project Overview

This project is a professional portfolio website built with:

- HTML
- CSS
- JavaScript

The website is designed to present a personal portfolio in a clean and modern way. It includes:

- Home section
- Skills section
- Projects section
- Contact section
- Admin login page
- Admin dashboard

The portfolio is responsive, so it works on desktop, tablet, and mobile devices.

---

## Project System Design

This project is a frontend-based portfolio system.

### Main user side

The main portfolio page is for visitors.  
Visitors can:

- see profile information
- view skills
- view projects
- send a message through the contact form

### Admin side

The admin side is protected by a login page.  
Only the admin can:

- log in with username and password
- update portfolio content
- add, edit, or remove skills
- add, edit, or remove projects
- view contact form messages

### Data storage

This project does not use a database or backend server.  
All data is stored in the browser using `localStorage`.

That means:

- portfolio data is saved in the browser
- admin login session is saved in the browser
- contact messages are saved in the browser

Important note:

This is good for practice projects, demos, and local use.  
For real production use, a backend and database should be added.

---

## How The Project Works

### Portfolio flow

1. The visitor opens the portfolio website.
2. The website loads the portfolio data from `localStorage`.
3. Skills, projects, and profile details are shown on the page.
4. If a visitor sends a message from the contact form, the message is saved in `localStorage`.
5. The admin can later see that message in the admin dashboard.

### Admin flow

1. The admin opens the login page.
2. The admin enters the correct username and password.
3. If the credentials are correct, login state is saved in `localStorage`.
4. The admin dashboard opens.
5. The admin can update the portfolio content.
6. Changes are saved in `localStorage` and reflected on the portfolio page.

---

## File Structure

```text
New project/
├── admin.html
├── index.html
├── login.html
├── README.md
├── assets/
│   ├── .gitkeep
│   ├── profile-photo.jpeg
│   └── profile-portrait.svg
├── css/
│   ├── admin.css
│   ├── animations.css
│   ├── base.css
│   ├── contact.css
│   ├── header.css
│   ├── hero.css
│   ├── login.css
│   ├── projects.css
│   ├── responsive.css
│   ├── skills.css
│   └── style.css
└── js/
    ├── admin.js
    ├── auth.js
    ├── data.js
    ├── login.js
    ├── main.js
    ├── portfolio-app.js
    ├── portfolio-dom.js
    ├── portfolio-icons.js
    ├── portfolio-interactions.js
    └── portfolio-render.js
```

---

## Important Files

### HTML files

- `index.html`  
  Main portfolio page

- `login.html`  
  Admin login page

- `admin.html`  
  Admin dashboard

### CSS files

- `style.css`  
  Main CSS entry file

- `base.css`  
  Global styles, colors, layout base

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
  Animations and transitions

- `responsive.css`  
  Mobile and tablet responsive design

- `admin.css`  
  Admin dashboard styles

- `login.css`  
  Admin login page styles

### JavaScript files

- `data.js`  
  Default portfolio data and localStorage handling

- `auth.js`  
  Admin login credentials and auth checking

- `login.js`  
  Login form logic

- `admin.js`  
  Admin dashboard logic

- `main.js`  
  Main portfolio entry file

- `portfolio-app.js`  
  Starts the portfolio app

- `portfolio-dom.js`  
  Handles DOM element selection

- `portfolio-icons.js`  
  Skill icons

- `portfolio-interactions.js`  
  Cursor effects, reveal effects, navigation, and interactions

- `portfolio-render.js`  
  Renders portfolio data into the page

---

## Admin Credentials

Current admin login credentials:

- Username: `admin`
- Password: `admin123`

These credentials are defined in:

- `js/auth.js`

---

## Features

- Responsive portfolio layout
- Professional UI design
- Skills with icons
- Animated project cards
- Custom cursor effect
- Smooth scroll reveal animation
- Contact form with validation
- Admin login protection
- Admin dashboard for editing content
- LocalStorage-based data saving

---

## Simple Explanation Of The Project

This project is a personal portfolio website where people can see your profile, skills, and projects.

It also has an admin system. The admin can log in, change portfolio content, and see the messages submitted from the contact form.

The whole project is made using only frontend technologies, so it is easy to run locally without backend setup.

---

## How To Open The Project

### Open portfolio

Open:

- `index.html`

### Open admin login

Open:

- `login.html`

Then log in with the admin username and password.

---

## Future Improvement Ideas

- Add backend and database
- Add real email sending for contact form
- Add image upload from admin panel
- Add real authentication with encrypted passwords
- Add project thumbnails and live links

