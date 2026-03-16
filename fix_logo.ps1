Add-Type -AssemblyName System.Drawing

$sourceFile = 'c:\Users\ste_r\Downloads\S Robinson\logo.png'
$targetFile = 'c:\Users\ste_r\Downloads\S Robinson\logo-blue.png'

$bitmap = [System.Drawing.Bitmap]::FromFile($sourceFile)
$newBitmap = New-Object System.Drawing.Bitmap($bitmap.Width, $bitmap.Height)
$graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
$graphics.DrawImage($bitmap, 0, 0)
$graphics.Dispose()
$bitmap.Dispose()

for ($y = 0; $y -lt $newBitmap.Height; $y++) {
    for ($x = 0; $x -lt $newBitmap.Width; $x++) {
        $pixelColor = $newBitmap.GetPixel($x, $y)
        
        # Check if the pixel has a yellowish/brownish hue (i.e. part of the arrow or its anti-aliased edge)
        # Black text will have R ~ G ~ B. 
        # Arrow has high R and G, low B. For its antialiased dark edges, R and G will still be slightly strictly greater than B.
        if ($pixelColor.A -gt 0 -and ($pixelColor.R -gt $pixelColor.B + 5 -or $pixelColor.G -gt $pixelColor.B + 5)) {
            
            # The original intensity will be the max of R and G channels in the yellow
            $intensity = [math]::Max($pixelColor.R, $pixelColor.G)
            
            # Target color is #3366FF (R: 51, G: 102, B: 255)
            # We scale it down proportionally to the original intensity
            $newR = [math]::Min(255, [math]::Max(0, [math]::Round(51 * $intensity / 255)))
            $newG = [math]::Min(255, [math]::Max(0, [math]::Round(102 * $intensity / 255)))
            $newB = [math]::Min(255, [math]::Max(0, [math]::Round(255 * $intensity / 255)))
            
            $newBitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($pixelColor.A, $newR, $newG, $newB))
        }
    }
}

$newBitmap.Save($targetFile, [System.Drawing.Imaging.ImageFormat]::Png)
$newBitmap.Dispose()

Write-Host "Logo successfully updated at $targetFile"
