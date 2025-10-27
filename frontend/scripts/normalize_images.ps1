Param()

# Normalize filenames and directory names under frontend/public/images
 $root = Join-Path $PSScriptRoot '..\public\images' | Resolve-Path
 $rootPath = $root.Path

Write-Host "Normalizing image files under: $rootPath"

$mappings = @()

function Make-Safe([string]$s) {
    # Lowercase, replace any non-alphanumeric with '-', collapse multiple '-', trim leading/trailing '-'
    $t = $s.ToLower()
    $t = $t -replace "[^a-z0-9]+", "-"
    $t = $t -replace "(^-+)|(-+$)", ""
    if ([string]::IsNullOrWhiteSpace($t)) { $t = "file" }
    return $t
}

# First, rename files (so we can avoid overwriting during directory changes)
Get-ChildItem -Path $rootPath -File -Recurse | ForEach-Object {
    $file = $_
    $relOld = $file.FullName.Substring($rootPath.Length) -replace "\\", "/"
    if ($relOld.StartsWith('/')) { $relOld = $relOld.Substring(1) }
    $oldRel = '/images/' + $relOld
    $base = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $ext = [System.IO.Path]::GetExtension($file.Name).ToLower()
    $safeBase = Make-Safe $base
    $newName = "$safeBase$ext"
    $targetPath = Join-Path $file.DirectoryName $newName

    # Handle collisions by appending a counter
    $counter = 1
    while (Test-Path $targetPath -PathType Leaf -ErrorAction SilentlyContinue) {
        if ($targetPath -ieq $file.FullName) { break }
        $newName = "${safeBase}-$counter$ext"
        $targetPath = Join-Path $file.DirectoryName $newName
        $counter++
    }

    if ($targetPath -ne $file.FullName) {
        Rename-Item -LiteralPath $file.FullName -NewName $newName -Force
        $relativeNew = $targetPath.Substring($rootPath.Length) -replace "\\", "/"
        if ($relativeNew.StartsWith('/')) { $relativeNew = $relativeNew.Substring(1) }
        $newRel = '/images/' + $relativeNew
        $mappings += @{ old = $oldRel; new = $newRel }
        Write-Host "Renamed file: $oldRel -> $newRel"
    }
}

# Then rename directories bottom-up
 $dirs = Get-ChildItem -Path $rootPath -Directory -Recurse | Sort-Object FullName -Descending
foreach ($d in $dirs) {
    $relOldDir = $d.FullName.Substring($rootPath.Length) -replace "\\", "/"
    if ($relOldDir.StartsWith('/')) { $relOldDir = $relOldDir.Substring(1) }
    $oldDirRel = '/images/' + $relOldDir
    $parent = Split-Path $d.FullName -Parent
    $safe = Make-Safe $d.Name
    if ($safe -ne $d.Name) {
        $newFullPath = Join-Path $parent $safe
        # Handle collisions
        $counter = 1
        $tryPath = $newFullPath
        while (Test-Path $tryPath -PathType Container -ErrorAction SilentlyContinue) {
            if ($tryPath -ieq $d.FullName) { break }
            $tryPath = "$newFullPath-$counter"
            $counter++
        }
        if ($tryPath -ne $d.FullName) {
            Rename-Item -LiteralPath $d.FullName -NewName (Split-Path $tryPath -Leaf) -Force
            $relativeNewDir = $tryPath.Substring($rootPath.Length) -replace "\\", "/"
            if ($relativeNewDir.StartsWith('/')) { $relativeNewDir = $relativeNewDir.Substring(1) }
            $newDirRel = '/images/' + $relativeNewDir
            $mappings += @{ old = $oldDirRel; new = $newDirRel }
            Write-Host "Renamed dir: $oldDirRel -> $newDirRel"
        }
    }
}

# Save mapping to JSON
$mapPath = Join-Path $PSScriptRoot 'image_name_map.json'
$mappings | ConvertTo-Json -Depth 4 | Out-File -FilePath $mapPath -Encoding utf8
Write-Host "Wrote mapping to: $mapPath"
