import fitz  # PyMuPDF
import os
import re

def extract_pdf_content(pdf_path, output_md, img_dir):
    os.makedirs(img_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    toc = doc.get_toc()
    
    with open(output_md, "w", encoding="utf-8") as md_file:
        md_file.write("# Airbus A321 Technical Data - Aircraft Characteristics\n\n")
        
        if toc:
            md_file.write("## Table of Contents\n")
            for level, title, page in toc:
                indent = "  " * (level - 1)
                md_file.write(f"{indent}- [{title}](#page-{page})\n")
            md_file.write("\n---\n\n")

        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            page_rect = page.rect
            
            # Margins to ignore (Header/Footer)
            margin_top = 75
            margin_bottom = 75
            content_rect = fitz.Rect(0, margin_top, page_rect.width, page_rect.height - margin_bottom)
            
            md_file.write(f'<a name="page-{page_num + 1}"></a>\n')
            md_file.write(f"## Page {page_num + 1}\n\n")
            
            text = page.get_text("text")
            
            # Detect Figure Title
            # Using a safer regex to avoid encoding issues
            fig_match = re.search(r"(FIGURE\s+[0-9\-A-Z]+.*)", text, re.IGNORECASE)
            fig_title = fig_match.group(1).strip() if fig_match else f"Diagram_Page_{page_num + 1}"
            clean_title = re.sub(r'[\\/*?:\"<>|]', "", fig_title).replace(" ", "_")[:60]

            # 1. Extract Raster Images
            image_list = page.get_images(full=True)
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                if base_image["width"] < 150 or base_image["height"] < 150:
                    continue 
                
                image_filename = f"p{page_num+1}_raster_{img_index+1}.{base_image['ext']}"
                image_path = os.path.join(img_dir, image_filename)
                with open(image_path, "wb") as f:
                    f.write(base_image["image"])
                md_file.write(f"![{fig_title}]({img_dir}/{image_filename})\n\n")

            # 2. Precision Vector Diagram Extraction
            drawings = page.get_drawings()
            # Filter for drawings strictly within the content area
            content_drawings = [
                d for d in drawings 
                if d["rect"].y0 > margin_top and d["rect"].y1 < page_rect.height - margin_bottom
                and d["rect"].width > 5 and d["rect"].height > 5 # Ignore tiny artifacts
            ]
            
            if content_drawings:
                # Calculate tight bounding box for all drawings
                bbox = content_drawings[0]["rect"]
                for d in content_drawings[1:]:
                    bbox |= d["rect"]
                
                # Check if the drawing area is substantial
                if bbox.width > 100 and bbox.height > 100:
                    # Pad slightly but stay within page bounds
                    bbox.x0 = max(0, bbox.x0 - 5)
                    bbox.y0 = max(margin_top, bbox.y0 - 5)
                    bbox.x1 = min(page_rect.width, bbox.x1 + 5)
                    bbox.y1 = min(page_rect.height - margin_bottom, bbox.y1 + 5)

                    # Render at high resolution (300 DPI)
                    zoom = 3
                    mat = fitz.Matrix(zoom, zoom)
                    pix = page.get_pixmap(matrix=mat, clip=bbox, alpha=False)
                    
                    image_filename = f"p{page_num+1}_vector_{clean_title}.png"
                    image_path = os.path.join(img_dir, image_filename)
                    pix.save(image_path)
                    md_file.write(f"![{fig_title}]({img_dir}/{image_filename})\n\n")

            # Extract Text (excluding headers/footers)
            clean_text = page.get_text("text", clip=content_rect)
            if clean_text.strip():
                md_file.write(clean_text)
                md_file.write("\n\n")
            
            md_file.write("\n---\n\n")

    print(f"Diagram-focused extraction complete. Files saved to {output_md} and {img_dir}/")

if __name__ == "__main__":
    PDF_FILE = "input/Airbus-techdata-AC_A321_0322 (2) (1).pdf"
    OUTPUT_MD = "content.md"
    IMAGE_DIR = "public/img"
    
    if not os.path.exists(PDF_FILE):
        print(f"Error: {PDF_FILE} not found.")
    else:
        try:
            import fitz
        except ImportError:
            print("Error: PyMuPDF not found. Please install it using: pip install pymupdf")
        else:
            extract_pdf_content(PDF_FILE, OUTPUT_MD, IMAGE_DIR)
