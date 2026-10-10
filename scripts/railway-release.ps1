# Production database release for Railway (docs/DEPLOYMENT.md "Appendix: Railway"). Run from the repo root, on a
# trusted machine, by the owner. It prompts for the connection strings (hidden input) and keeps them in this process
# only: nothing is written to disk or shell history.
#
#   powershell -ExecutionPolicy Bypass -File scripts/railway-release.ps1            # migrations + grants only
#   powershell -ExecutionPolicy Bypass -File scripts/railway-release.ps1 -FirstRun   # + catalogue seed + content import
#   powershell -ExecutionPolicy Bypass -File scripts/railway-release.ps1 -BootstrapEmail you@example.org
#       (after registering on the site and verifying the email: makes that account the first SUPER_ADMIN)
#
# NODE_ENV stays unset (the scripts do not serve requests); the database itself refuses demo rows because
# app.environment = 'production'.
#
# Content is imported IN REVIEW; publishing is a separate, human step (section 41):
#   powershell -ExecutionPolicy Bypass -File scripts/railway-release.ps1 -PublishAs <your email>
#       (lists what would be published, then publishes only after you type PUBLISH: your attestation that you reviewed it)
param([switch]$FirstRun, [string]$BootstrapEmail, [string]$PublishAs)
$ErrorActionPreference = "Stop"

function Read-Secret([string]$prompt) {
  $secure = Read-Host -AsSecureString $prompt
  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}

if ($BootstrapEmail) {
  $env:DATABASE_URL = Read-Secret "App URL (postgresql://app_rw:<password>@<public host>:<port>/dzidza)"
  try {
    npx tsx --conditions=react-server scripts/bootstrap-super-admin.ts --email $BootstrapEmail
    if ($LASTEXITCODE -ne 0) { throw "bootstrap failed" }
  } finally { Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue }
  exit 0
}

if ($PublishAs) {
  $env:DATABASE_URL = Read-Secret "App URL (postgresql://app_rw:<password>@<public host>:<port>/dzidza)"
  try {
    npm run content:publish -- --approver $PublishAs --dry-run
    if ($LASTEXITCODE -ne 0) { throw "dry run failed" }
    $answer = Read-Host "Type PUBLISH to confirm you reviewed every item listed above (anything else cancels)"
    if ($answer -ceq "PUBLISH") {
      npm run content:publish -- --approver $PublishAs --note "Reviewed by $PublishAs before the production launch"
      if ($LASTEXITCODE -ne 0) { throw "publish failed" }
    } else { Write-Host "Cancelled: nothing was published." }
  } finally { Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue }
  exit 0
}

Write-Host "Use the Postgres service's PUBLIC host and port (Railway > Postgres > Variables > DATABASE_PUBLIC_URL), database 'dzidza'."
$owner = Read-Secret "Owner URL (postgresql://dzidza_owner:<password>@<public host>:<port>/dzidza)"
$env:MIGRATION_DATABASE_URL = $owner
$env:DB_APP_ENVIRONMENT = "production"
try {
  Write-Host "`n1/3 Migrations, grants and production guards (scripts/db-deploy.ts)..."
  npx tsx scripts/db-deploy.ts
  if ($LASTEXITCODE -ne 0) { throw "db-deploy failed" }

  if ($FirstRun) {
    $app = Read-Secret "App URL (postgresql://app_rw:<password>@<public host>:<port>/dzidza)"
    $env:DATABASE_URL = $app
    $env:MIGRATION_DATABASE_URL = ""
    Write-Host "`n2/3 Catalogue seed (never the demo seed)..."
    npm run db:seed
    if ($LASTEXITCODE -ne 0) { throw "seed failed" }
    Write-Host "`n3/3 Content import (every family, in one run so borrowed concepts resolve)..."
    npm run content:import
    if ($LASTEXITCODE -ne 0) { throw "content import failed" }
    Write-Host "`nDone. Next: register on the site with your email, verify it, then run:"
    Write-Host "  powershell -ExecutionPolicy Bypass -File scripts/railway-release.ps1 -BootstrapEmail <your email>"
    Write-Host "  powershell -ExecutionPolicy Bypass -File scripts/railway-release.ps1 -PublishAs <your email>"
  }
} finally {
  Remove-Item Env:MIGRATION_DATABASE_URL, Env:DATABASE_URL -ErrorAction SilentlyContinue
}
