# Cosmic Explorer

Cosmic Explorer is an interactive PHP + JavaScript web application for learning about our solar system. It combines educational content, dynamic UI components, account-based features, and a lightweight quiz experience into a single project.

## Highlights

- **Planet exploration:** Browse planet cards and open a dedicated detail page for each world.
- **Comparison tools:** Sort and compare key planetary metrics (diameter, mass, distance, gravity, and more).
- **Interactive quiz:** Test knowledge with randomized multiple-choice questions and score tracking.
- **Community comments:** Authenticated users can create, edit, and delete comments on planet pages.
- **Contact workflow:** Multi-layer validation for contact form submissions.
- **NASA APOD integration:** Displays NASA’s Astronomy Picture of the Day on the home page.
- **Responsive experience:** Mobile-friendly layout with theme toggle, animated UI elements, and reusable components.

## Tech Stack

- **Backend:** PHP 8+, PDO, MySQL
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database:** MySQL schema with users, comments, quiz scores, and contact messages

## Project Structure

```text
cosmic-explorer/
├── actions/          # Form handlers (auth, comments, contact, quiz)
├── assets/images/    # Planet illustrations
├── css/              # Global and page-specific styles
├── includes/         # Shared PHP modules (config, auth, DB, layout helpers)
├── js/               # Shared and page-specific scripts
├── sql/schema.sql    # Database schema + starter data
├── *.php             # Route/page entry points
└── README.md
```

## Setup Instructions

### 1) Clone the repository

```bash
git clone <your-repository-url>
cd cosmic-explorer
```

### 2) Create the database

Run the schema file in MySQL:

```bash
mysql -u root -p < sql/schema.sql
```

### 3) Configure app settings

Update values in `includes/config.php` as needed:

- `DB_HOST`
- `DB_NAME`
- `DB_USER`
- `DB_PASS`
- `APP_URL`
- `NASA_API_KEY`

### 4) Serve the app

Place the project in your web root (e.g., `htdocs` for XAMPP) and open:

- `http://localhost/cosmic-explorer`

## Core Features by Module

- `actions/process-register.php` and `actions/process-login.php`: registration and login flows with CSRF validation and password hashing.
- `actions/process-comment.php`: authenticated CRUD operations for planet comments.
- `actions/process-quiz.php`: persists quiz scores for logged-in users.
- `js/data.js`: central source of planet data and quiz question data.
- `js/main.js`: global behaviors (theme switch, stars background, mobile nav, scroll effects).

## Security Notes

This project includes several baseline protections:

- Session-based authentication helpers
- CSRF token generation and validation
- Input sanitization before output
- Prepared SQL statements via PDO
- Password hashing with `password_hash()` and verification with `password_verify()`

## Future Improvements

- Move API keys and secrets to environment variables
- Add automated tests (PHPUnit + frontend checks)
- Add admin moderation for contact and comment management
- Add pagination/search for large comment threads
- Improve accessibility (keyboard navigation + ARIA coverage)

## License

This project is intended for educational use. Add a license file if you plan to distribute it publicly.
