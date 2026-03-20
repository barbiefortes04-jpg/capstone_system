# Capstone System (SRMS)

Student Research Management System — a Laravel app for managing capstone/thesis submissions, adviser feedback, and repository metadata.

## Status

- Restored SRMS code and removed unrelated Digital Twin/RAG artifacts.
- Repository pushed to GitHub as `capstone_system` (backup branches preserved).

## Quick start (recommended: WSL / Ubuntu)

1. Install PHP 8.4+, Composer and SQLite PHP driver:

```bash
# example (Ubuntu)
sudo apt update
sudo apt install -y php8.4 php8.4-xml php8.4-mbstring php8.4-sqlite3 unzip curl
# install composer if needed
```

2. Install PHP dependencies:

```bash
composer install
```

3. Configure environment:

```bash
cp .env.example .env
php artisan key:generate
# Use SQLite for local testing
touch database/database.sqlite
# update .env:
# DB_CONNECTION=sqlite
# DB_DATABASE=/full/path/to/database/database.sqlite
```

4. Run migrations:

```bash
php artisan migrate --force
```

5. Start the development server:

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

## Notes

- Blade templates are in `resources/views`; public assets are in `public/`.
- The app was validated under PHP 8.4 on WSL; use the SQLite workflow for quick local setup.

## Branches & backups

Backup branches created during cleanup:

- `before-restore-77b255b`
- `before-delete-rag-91c30d8`
- `before-prune-srms-036f2fe`

## Security

If you exposed a token, revoke it immediately at https://github.com/settings/tokens. Prefer fine-grained PATs or SSH keys for long‑term access.

## Contributing

Fork, create a branch, and submit a pull request.

---
Maintainer: `barbiefortes04-jpg`
