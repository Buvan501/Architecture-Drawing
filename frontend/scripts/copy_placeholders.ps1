# Copy placeholder images from the project's DRAWING PLANS folder into the frontend public images folder.
# Adjust the source path if your workspace layout differs.

$source = Join-Path -Path $PSScriptRoot -ChildPath "..\..\..\DRAWING PLANS\Placeholder"
$dest = Join-Path -Path $PSScriptRoot -ChildPath "..\public\images\Placeholder"

# Resolve full paths
$sourceFull = Resolve-Path -Path $source -ErrorAction SilentlyContinue
if (-not $sourceFull) {
    Write-Host "Source folder not found: $source" -ForegroundColor Red
    Write-Host "Please make sure the path is correct relative to the frontend/scripts folder." -ForegroundColor Yellow
    exit 1
}

$destFull = Resolve-Path -Path $dest -ErrorAction SilentlyContinue
if (-not $destFull) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}

# Copy files
try {
    Copy-Item -Path (Join-Path $sourceFull.Path "*") -Destination $dest -Recurse -Force
    Write-Host "Copied placeholder images from $($sourceFull.Path) to $dest" -ForegroundColor Green
} catch {
    Write-Host "Failed to copy files: $_" -ForegroundColor Red
    exit 1
}
