# Contributing

Thanks for your interest in contributing to Capstone System (SRMS)! Please follow these guidelines to help keep contributions easy to review and integrate.

How to contribute
- Fork the repository and create a branch from `main` for your change: `git checkout -b feat/my-feature`.
- Keep branches focused and small: one logical change per branch/PR.
- Write clear, descriptive commit messages and include a brief PR description explaining the motivation and any relevant implementation details.

Development setup
- See `README.md` for full setup steps. Typical flow:
  - `composer install`
  - `cp .env.example .env` and update environment values
  - `php artisan key:generate`
  - `touch database/database.sqlite` (for local SQLite testing)
  - `php artisan migrate`

Testing
- Run unit and feature tests locally before opening a PR:

```bash
php artisan test
# or
vendor/bin/phpunit
```

Code style & standards
- Follow existing project conventions (PSR-12 for PHP). Keep formatting consistent.
- Prefer clear, maintainable code over clever one-liners.

Pull request process
- Open a PR from your fork/branch into `main`.
- Provide a concise title and description; link related issues if any.
- Ensure all tests pass and include screenshots or steps to manually verify UI changes when relevant.
- Address review comments promptly; keep changes small when updating a PR.

Security and sensitive data
- Do NOT commit secrets, tokens, or credentials. If you accidentally commit a secret, delete it and rotate/revoke the credential immediately.

Getting help
- Open an issue for design decisions or large changes before implementing.

Thank you for helping improve the project!
