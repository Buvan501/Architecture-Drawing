# Copy specific DRAWING PLANS folders into frontend/public/images so Vite can serve them.
# Source base (project root)
$sourceBase = Join-Path -Path $PSScriptRoot -ChildPath "..\..\..\DRAWING PLANS"
$destBase = Join-Path -Path $PSScriptRoot -ChildPath "..\public\images"

$foldersToCopy = @('3D-Plans','Elevation','Structural designs')

foreach ($folder in $foldersToCopy) {
    $src = Join-Path $sourceBase $folder
    if (-not (Test-Path $src)) {
        Write-Host "Source folder not found: $src" -ForegroundColor Yellow
        continue
    }
    $dest = Join-Path $destBase $folder
    if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }
    Copy-Item -Path (Join-Path $src "*") -Destination $dest -Recurse -Force
    Write-Host "Copied $folder to $dest" -ForegroundColor Green
}

# For 2D plans, some images are in the Placeholder folder. We'll create `Plans` and copy known 2D files if they exist.
$plansDest = Join-Path $destBase 'Plans'
if (-not (Test-Path $plansDest)) { New-Item -ItemType Directory -Path $plansDest -Force | Out-Null }

$possible2DFiles = @(
    '4358316.jpg',
    '4a396338-2b0e-494d-b267-599c8b0a2443.jpeg',
    'Free Photo _ View of 3d house model.jpeg'
)

$placeholderSrc = Join-Path $sourceBase 'Placeholder'
foreach ($file in $possible2DFiles) {
    $srcFile = Join-Path $placeholderSrc $file
    if (Test-Path $srcFile) {
        Copy-Item -Path $srcFile -Destination $plansDest -Force
        Write-Host "Copied 2D file $file to $plansDest" -ForegroundColor Green
    } else {
        Write-Host "2D file not found in Placeholder: $file" -ForegroundColor Yellow
    }
}

Write-Host "Finished copying drawing plan folders." -ForegroundColor Cyan
