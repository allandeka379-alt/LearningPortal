# Project-local PostgreSQL cluster for development (trust auth, localhost only, port 5433).
# Usage: npm run db:start | npm run db:stop
# Override the binaries location with $env:PG_BIN if PostgreSQL is installed elsewhere.
param([Parameter(Mandatory = $true)][ValidateSet("start", "stop", "status", "init")][string]$Action)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$bin = if ($env:PG_BIN) { $env:PG_BIN } else { "C:\Program Files\PostgreSQL\18\bin" }
$data = Join-Path $root ".data\pg"
$log = Join-Path $root ".data\pg.log"
$port = 5433

function Test-Ready { & "$bin\pg_isready.exe" -h localhost -p $port -q; return $LASTEXITCODE -eq 0 }

switch ($Action) {
  "init" {
    if (Test-Path (Join-Path $data "PG_VERSION")) { Write-Host "Cluster already initialised at $data"; break }
    New-Item -ItemType Directory -Force (Split-Path $data) | Out-Null
    & "$bin\initdb.exe" -D $data -U postgres --auth=trust -E UTF8 --no-locale
  }
  "start" {
    if (-not (Test-Path (Join-Path $data "PG_VERSION"))) { & $PSCommandPath init }
    if (Test-Ready) {
      Write-Host "PostgreSQL already running on port $port"
    } else {
      # pg_ctl keeps inherited stdout handles open on Windows, so launch it detached.
      Start-Process -FilePath "$bin\pg_ctl.exe" -WindowStyle Hidden -ArgumentList @(
        "-D", "`"$data`"", "-l", "`"$log`"", "-o", "`"-p $port -c listen_addresses=localhost -c max_connections=200`"", "start"
      )
      for ($i = 0; $i -lt 30; $i++) { if (Test-Ready) { break }; Start-Sleep -Milliseconds 500 }
      if (-not (Test-Ready)) { throw "PostgreSQL did not become ready; see $log" }
    }
    foreach ($db in @("zimstudy", "zimstudy_test")) {
      $exists = & "$bin\psql.exe" -U postgres -h localhost -p $port -tAc "select 1 from pg_database where datname='$db'"
      if ($exists -ne "1") { & "$bin\createdb.exe" -U postgres -h localhost -p $port $db }
      # Restricted app role (app_rw) + privileges; idempotent. Re-run `npm run db:grants` after new migrations.
      & "$bin\psql.exe" -U postgres -h localhost -p $port -d $db -q -v ON_ERROR_STOP=1 -f (Join-Path $root "scripts\sql\app-role-grants.sql") | Out-Null
    }
    Write-Host "PostgreSQL running on localhost:$port"
  }
  "stop" { & "$bin\pg_ctl.exe" -D $data -m fast stop }
  "status" { & "$bin\pg_ctl.exe" -D $data status }
}
