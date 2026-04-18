# Set encoding to UTF8 just in case, but using English to avoid all font issues
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Add-Type -AssemblyName System.Drawing

# 1. Search for all images in parent and sub-folders
$files = Get-ChildItem -Recurse -Include *.jpg, *.png, *.jpeg
$totalFiles = $files.Count
$results = @()

Write-Host "Found $totalFiles images. Starting sequential processing..." -ForegroundColor Green
Write-Host "------------------------------------------------------------"

foreach ($file in $files) {
    $out = "$($file.DirectoryName)\$($file.BaseName).webp"
    
    # SKIP if WebP already exists
    if (Test-Path $out) {
        $oldSize = $file.Length
        $newSize = (Get-Item $out).Length
        $percentSaved = [Math]::Round((($oldSize - $newSize) / $oldSize) * 100, 2)
        
        $results += [PSCustomObject]@{
            FileName = $file.Name
            Status   = "Skipped"
            OldSize  = $oldSize
            NewSize  = $newSize
            Saved    = $percentSaved
        }
        Write-Host "Skipped: $($file.Name)" -ForegroundColor Gray
        continue
    }

    try {
        # Check image dimensions for Resize logic
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $w = $img.Width
        $h = $img.Height
        $resizeCmd = ""

        # Logic: Landscape > 1920 OR Portrait > 1080
        if ($w -gt 1920 -and $w/$h -ge 1) {
            $resizeCmd = "-resize 1920 0"
        }
        elseif ($h -gt 1080 -and $h/$w -gt 1) {
            $resizeCmd = "-resize 0 1080"
        }

        # Run cwebp command
        $cmd = "cwebp -q 75 -m 6 -sharp_yuv $resizeCmd `"$($file.FullName)`" -o `"$out`""
        Invoke-Expression $cmd

        $oldSize = $file.Length
        $newSize = (Get-Item $out).Length
        $percentSaved = [Math]::Round((($oldSize - $newSize) / $oldSize) * 100, 2)

        $results += [PSCustomObject]@{
            FileName = $file.Name
            Status   = if ($resizeCmd -ne "") {"Resized"} else {"Compressed"}
            OldSize  = $oldSize
            NewSize  = $newSize
            Saved    = $percentSaved
        }

        $img.Dispose()
        Write-Host "Done: $($file.Name) (-$percentSaved%)" -ForegroundColor Cyan
    }
    catch {
        Write-Host "Error: Could not process $($file.Name)" -ForegroundColor Red
    }
}

# --- FINAL REPORT ---
Clear-Host
Write-Host "`n==================== OPTIMIZATION REPORT (SORTED BY SAVED %) ====================" -ForegroundColor Yellow
$results | Sort-Object Saved -Descending | Format-Table -Property `
    @{Label="File Name"; Expression={$_.FileName}}, `
    @{Label="Status"; Expression={$_.Status}}, `
    @{Label="Original (KB)"; Expression={[Math]::Round($_.OldSize / 1KB, 2)}}, `
    @{Label="WebP (KB)"; Expression={[Math]::Round($_.NewSize / 1KB, 2)}}, `
    @{Label="Saved (%)"; Expression={"$($_.Saved) %"}}

$totalOld = ($results | Measure-Object OldSize -Sum).Sum
$totalNew = ($results | Measure-Object NewSize -Sum).Sum
if ($totalOld -gt 0) {
    $totalSaved = [Math]::Round((($totalOld - $totalNew) / $totalOld) * 100, 2)
    Write-Host "--------------------------------------------------------------------------------"
    Write-Host "SUMMARY: Reduced from $([Math]::Round($totalOld/1MB, 2)) MB to $([Math]::Round($totalNew/1MB, 2)) MB" -ForegroundColor Green
    Write-Host "Total Space Saved: $totalSaved%" -ForegroundColor Green
}
Write-Host "================================================================================`n"
Pause