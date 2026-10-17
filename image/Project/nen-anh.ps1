# 1. Tạo thư mục output nếu chưa có
if (!(Test-Path "output")) { New-Item -ItemType Directory -Name "output" | Out-Null }

# 2. Bắt đầu đo thời gian
$elapsed = Measure-Command {
    # Lấy danh sách file ảnh
    $files = Get-ChildItem -File -Recurse -Include *.jpg,*.jpeg,*.png,*.bmp | 
             Where-Object { $_.FullName -notlike "*\output\*" }
    
    $total = $files.Count
    if ($total -eq 0) { Write-Host "Không tìm thấy file!" -ForegroundColor Red; return }

    Write-Host "--- CHẾ ĐỘ ĐA NHÂN (4 LUỒNG) - GIỮ TÊN GỐC ---" -ForegroundColor Magenta

    # Chạy song song 4 luồng
    $files | ForEach-Object -Parallel {
        $file = $_
        
        # Chuyển đổi sang .webp, giữ nguyên tên gốc
        ffmpeg -i $file.FullName `
            -vf "scale='if(gt(iw,ih),min(1920,iw),-1)':'if(gt(iw,ih),-1,min(1080,ih))'" `
            -c:v libwebp -q:v 82 -compression_level 6 -preset photo `
            "output\$($file.BaseName).webp" -y -loglevel error
            
        Write-Host "Xong: $($file.BaseName).webp" -ForegroundColor Cyan
    } -ThrottleLimit 4
}

# 3. Tổng kết
Write-Host ("`n" + "=" * 30) -ForegroundColor Green
Write-Host "HOÀN THÀNH: Đã chuyển đổi sang định dạng WebP" -ForegroundColor Green
Write-Host "Tổng thời gian: $($elapsed.Minutes) phút $($elapsed.Seconds) giây" -ForegroundColor Yellow