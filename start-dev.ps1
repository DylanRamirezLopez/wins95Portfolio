$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 5173

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INICIANDO SERVIDOR DE DESARROLLO" -ForegroundColor Cyan
Write-Host "  Portfolio - Dylan Ramirez Lopez" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $projectDir

# Kill any process already using the port
$existing = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($existing) {
    $processId = $existing.OwningProcess
    Write-Host "Cerrando proceso anterior en puerto $port..." -ForegroundColor Yellow
    Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

Write-Host "Iniciando Vite dev server..." -ForegroundColor Green
Write-Host ""
Write-Host "  http://localhost:$port/" -ForegroundColor White -BackgroundColor DarkBlue
Write-Host ""
Write-Host "Los cambios se reflejan automaticamente en tiempo real." -ForegroundColor Green
Write-Host "Cierra esta ventana para detener el servidor." -ForegroundColor Yellow
Write-Host ""

Start-Process "http://localhost:$port/"

npx vite --port $port
