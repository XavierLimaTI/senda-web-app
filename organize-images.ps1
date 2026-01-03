# Script para organizar imagens do Ideogram para pastas corretas
$sourceDir = "E:\SENDA\senda-web-app\docs\images"
$baseDestDir = "E:\SENDA\senda-web-app\public\images\senda"

# Obter todos os JPEG
$jpegs = Get-ChildItem "$sourceDir\*.jpeg" -ErrorAction SilentlyContinue | Sort-Object CreationTime

Write-Host "Encontrados $($jpegs.Count) arquivos JPEG`n"

# Mapping manual baseado na ordem de criação (você criou até ponto 6)
# Ponto 1: Hero Banner Cliente
# Ponto 2: Card Massoterapia  
# Ponto 3: Card Acupuntura
# Ponto 4: Card Reiki
# Ponto 5: Background Blog
# Ponto 6: Dashboard Terapeuta

$mapping = @(
    @{ index = 0; dest = "home-client"; name = "hero-banner.jpg"; desc = "Ponto 1: Hero Banner Cliente" },
    @{ index = 1; dest = "home-client"; name = "massage-card.jpg"; desc = "Ponto 2: Card Massoterapia" },
    @{ index = 2; dest = "home-client"; name = "acupuncture-card.jpg"; desc = "Ponto 3: Card Acupuntura" },
    @{ index = 3; dest = "home-client"; name = "reiki-card.jpg"; desc = "Ponto 4: Card Reiki" },
    @{ index = 4; dest = "home-client"; name = "blog-background.jpg"; desc = "Ponto 5: Background Blog" },
    @{ index = 5; dest = "home-therapist"; name = "dashboard-banner.jpg"; desc = "Ponto 6: Dashboard Terapeuta" }
)

foreach($map in $mapping) {
    if($jpegs[$map.index]) {
        $sourceFile = $jpegs[$map.index]
        $destFolder = "$baseDestDir\$($map.dest)"
        $destFile = "$destFolder\$($map.name)"
        
        # Criar pasta se não existir
        if(!(Test-Path $destFolder)) {
            New-Item -ItemType Directory -Path $destFolder -Force | Out-Null
        }
        
        # Copiar arquivo
        Copy-Item -Path $sourceFile.FullName -Destination $destFile -Force
        
        Write-Host "✓ $($map.desc)"
        Write-Host "  De: $($sourceFile.Name)"
        Write-Host "  Para: $destFile`n"
    }
}

Write-Host "Concluido!"
