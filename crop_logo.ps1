Add-Type -AssemblyName System.Drawing
 $bitmap = [System.Drawing.Bitmap]::FromFile('c:\Users\ste_r\Downloads\S Robinson\logo-blue.png')
 $cropRect = New-Object System.Drawing.Rectangle(0, 0, $bitmap.Width, 75)
 $newBitmap = New-Object System.Drawing.Bitmap($cropRect.Width, $cropRect.Height)
 $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
 $graphics.DrawImage($bitmap, 0, 0, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
 $graphics.Dispose()
 $bitmap.Dispose()

 $newBitmap.Save('c:\Users\ste_r\Downloads\S Robinson\logo-footer.png', [System.Drawing.Imaging.ImageFormat]::Png)
 $newBitmap.Dispose()
