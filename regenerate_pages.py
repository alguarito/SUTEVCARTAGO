import fitz
import os

pdf_path = "/Users/alvarocardenasorozco/Desktop/PROYECTOS/SUTEV/assets/docs/voces_que_transforman.pdf"
output_dir = "/Users/alvarocardenasorozco/Desktop/PROYECTOS/SUTEV/assets/images/revista"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(pdf_path)
totalPages = len(doc)
print(f"Total pages in PDF: {totalPages}")

# We use 320 DPI for extreme vector text sharpness
dpi = 320
zoom = dpi / 72  # Convert to zoom factor
matrix = fitz.Matrix(zoom, zoom)

for i in range(totalPages):
    page = doc[i]
    # Render page to a high-DPI image
    pix = page.get_pixmap(matrix=matrix, alpha=False)
    
    # Save as JPEG with 93% quality to balance size and perfect sharpness
    output_path = os.path.join(output_dir, f"pagina_{i+1}.jpg")
    pix.save(output_path)
    print(f"Generated {output_path} ({pix.width}x{pix.height})")

print("All pages regenerated successfully at 320 DPI!")
