<#
Simple helper to initialize repo (if needed), commit, set remote, and push to GitHub.
Usage:
  powershell -ExecutionPolicy Bypass -File .\scripts\push-to-github.ps1 -RepoUrl "https://github.com/yourusername/repo.git"

If you prefer SSH, provide an SSH remote URL (git@github.com:username/repo.git).
#>

param(
  [string]$RepoUrl
)

function Run-Git([string]$args) {
  Write-Host "git $args"
  $out = & git $args 2>&1
  $code = $LASTEXITCODE
  if ($code -ne 0) {
    Write-Host "Command failed (exit $code): git $args" -ForegroundColor Red
    Write-Host $out
    exit $code
  }
  return $out
}

if (-not (Test-Path .git)) {
  Write-Host "Initializing new git repository..."
  Run-Git "init"
} else {
  Write-Host ".git directory exists — using existing repository"
}

Write-Host "Staging all changes..."
& git add -A

Write-Host "Committing..."
$commit = & git commit -m "Initial commit" 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "No new commits created (maybe already committed). Message:"
  Write-Host $commit
} else {
  Write-Host "Committed changes."
}

Write-Host "Setting branch to 'main'..."
& git branch -M main

if (-not $RepoUrl) {
  $RepoUrl = Read-Host "Enter Git remote URL (HTTPS or SSH), e.g. https://github.com/you/repo.git"
}

if (-not $RepoUrl) {
  Write-Host "No remote URL provided — aborting." -ForegroundColor Red
  exit 1
}

# Add or update origin
$existing = & git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Host "Remote 'origin' exists: $existing"
  $ok = Read-Host "Replace remote 'origin' with $RepoUrl? (y/N)"
  if ($ok -match '^[Yy]') {
    Run-Git "remote set-url origin $RepoUrl"
  } else {
    Write-Host "Keeping existing remote."
  }
} else {
  Run-Git "remote add origin $RepoUrl"
}

Write-Host "Pushing to origin/main..."
try {
  & git push -u origin main
} catch {
  Write-Host "Push failed. Ensure you have permission and the remote URL is correct." -ForegroundColor Red
  exit 1
}

Write-Host "Push complete. Verify on GitHub and then re-trigger Vercel deployment." -ForegroundColor Green


