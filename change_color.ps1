Add-Type -AssemblyName System.Drawing
 $bitmap = [System.Drawing.Bitmap]::FromFile('c:\Users\ste_r\Downloads\S Robinson\logo.png')
 $newBitmap = New-Object System.Drawing.Bitmap($bitmap.Width, $bitmap.Height)
 $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
 $graphics.DrawImage($bitmap, 0, 0)
 $graphics.Dispose()
 $bitmap.Dispose()

 for ($y = 0; $y -lt $newBitmap.Height; $y++) {
     for ($x = 0; $x -lt $newBitmap.Width; $x++) {
         $pixelColor = $newBitmap.GetPixel($x, $y)
         if ($pixelColor.R -gt 150 -and $pixelColor.G -gt 150 -and $pixelColor.B -lt 150 -and $pixelColor.A -gt 0) {
             # It's yellowish. Replace with #3366FF (R: 51, G: 102, B: 255)
             $newBitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($pixelColor.A, 51, 102, 255))
         }
     }
 }
 $newBitmap.Save('c:\Users\ste_r\Downloads\S Robinson\logo-blue.png', [System.Drawing.Imaging.ImageFormat]::Png)
 $newBitmap.Dispose()
