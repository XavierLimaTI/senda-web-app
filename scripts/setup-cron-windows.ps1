# Script PowerShell para agendar tarefa no Windows Task Scheduler
# Executa a cada 5 minutos para expirar bookings PENDING

# ANTES DE EXECUTAR:
# 1. Defina as variáveis abaixo
# 2. Execute como Administrador: .\setup-cron-windows.ps1

$API_URL = "http://localhost:3000"  # Trocar por URL de produção
$CLEANUP_TOKEN = "SEU_CLEANUP_BEARER_TOKEN_AQUI"  # Mesmo do .env
$SCRIPT_DIR = $PSScriptRoot
$TASK_NAME = "Senda-ExpireBookings"

# Criar script que será executado
$scriptContent = @"
`$url = "$API_URL/api/bookings/expire"
`$token = "$CLEANUP_TOKEN"

try {
    `$response = Invoke-WebRequest -Uri `$url -Method POST ``
        -Headers @{ "Authorization" = "Bearer `$token" } ``
        -ContentType "application/json"
    
    `$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Output "[`$timestamp] Expiração executada: `$(`$response.Content)"
    
    # Log em arquivo
    Add-Content -Path "`$PSScriptRoot\expire-bookings.log" ``
        -Value "[`$timestamp] `$(`$response.Content)"
} catch {
    `$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Error "[`$timestamp] Erro: `$_"
    Add-Content -Path "`$PSScriptRoot\expire-bookings-errors.log" ``
        -Value "[`$timestamp] `$_"
}
"@

# Salvar script
$scriptPath = Join-Path $SCRIPT_DIR "run-expire-bookings.ps1"
Set-Content -Path $scriptPath -Value $scriptContent

# Criar tarefa agendada
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" `
    -Argument "-ExecutionPolicy Bypass -File `"$scriptPath`""

$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) `
    -RepetitionInterval (New-TimeSpan -Minutes 5) `
    -RepetitionDuration ([TimeSpan]::MaxValue)

$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $TASK_NAME `
    -Action $action -Trigger $trigger -Settings $settings `
    -Description "Expira bookings PENDING após 10 minutos" `
    -Force

Write-Host "✅ Tarefa agendada criada: $TASK_NAME" -ForegroundColor Green
Write-Host "   Executa a cada 5 minutos" -ForegroundColor Gray
Write-Host "   Script: $scriptPath" -ForegroundColor Gray
Write-Host "`n💡 Para gerenciar:" -ForegroundColor Yellow
Write-Host "   - Ver tarefas: taskschd.msc" -ForegroundColor Gray
Write-Host "   - Desabilitar: Disable-ScheduledTask -TaskName '$TASK_NAME'" -ForegroundColor Gray
Write-Host "   - Remover: Unregister-ScheduledTask -TaskName '$TASK_NAME' -Confirm:`$false" -ForegroundColor Gray
