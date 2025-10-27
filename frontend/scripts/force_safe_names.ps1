Param()

$root = Join-Path $PSScriptRoot '..\public\images' | Resolve-Path
$rootPath = $root.Path

Write-Host "Forcing safe filenames (lowercase/hyphens) under: $rootPath"

function Make-Safe([string]$s) {
    $t = $s.ToLower()
    $t = $t -replace "[^a-z0-9]+", "-"
    $t = $t -replace "(^-+)|(-+$)", ""
    if ([string]::IsNullOrWhiteSpace($t)) { $t = "file" }
    return $t
}

# Rename directories bottom-up to avoid path conflicts. Use copy+remove when case-only rename isn't honored.
$dirs = Get-ChildItem -Path $rootPath -Directory -Recurse | Sort-Object FullName -Descending
foreach ($d in $dirs) {
    $safe = Make-Safe($d.Name)
    if ($d.Name -ne $safe) {
        $parent = Split-Path $d.FullName -Parent
        $final = Join-Path $parent $safe
        try {
            if (-not (Test-Path $final -PathType Container)) {
                # Copy then remove original to ensure name change works on case-insensitive filesystems
                Copy-Item -Path $d.FullName -Destination $final -Recurse -Force
                Remove-Item -LiteralPath $d.FullName -Recurse -Force
                Write-Host "Copied then removed dir: $($d.FullName) -> $final"
            } else {
                # If final exists, try merging children then remove source
                Copy-Item -Path (Join-Path $d.FullName '*') -Destination $final -Recurse -Force
                Remove-Item -LiteralPath $d.FullName -Recurse -Force
                Write-Host "Merged and removed dir: $($d.FullName) -> $final"
            }
        } catch {
            Write-Warning "Failed to copy/rename dir $($d.FullName) -> $final : $_"
        }
    }
}

# Rename files to safe names
Get-ChildItem -Path $rootPath -File -Recurse | ForEach-Object {
    $file = $_
    $base = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $ext = [System.IO.Path]::GetExtension($file.Name).ToLower()
    $safeBase = Make-Safe($base)
    $safeName = "$safeBase$ext"
    $dir = $file.DirectoryName
    $final = Join-Path $dir $safeName
    if ($file.Name -ne $safeName) {
        try {
            if (-not (Test-Path $final -PathType Leaf)) {
                Copy-Item -Path $file.FullName -Destination $final -Force
                Remove-Item -LiteralPath $file.FullName -Force
                Write-Host "Copied then removed file: $($file.FullName) -> $final"
            } else {
                # If final exists, skip or overwrite depending on need; we'll overwrite
                Copy-Item -Path $file.FullName -Destination $final -Force
                Remove-Item -LiteralPath $file.FullName -Force
                Write-Host "Overwrote final and removed original: $($file.FullName) -> $final"
            }
        } catch {
            Write-Warning "Failed to copy/rename file $($file.FullName) -> $final : $_"
        }
    }
}

Write-Host "Force-safe names finished."
