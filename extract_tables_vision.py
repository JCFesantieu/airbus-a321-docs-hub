import os
import json
import base64
from google import genai
from google.genai import types
from pathlib import Path

def extract_tables_from_images():
    # Setup Client
    project_id = os.getenv("GOOGLE_CLOUD_PROJECT")
    if not project_id:
        print("Error: GOOGLE_CLOUD_PROJECT not set.")
        return

    # 'global' location for preview models
    location = "global"
    client = genai.Client(vertexai=True, project=project_id, location=location)
    
    # Model selection
    model_id = "gemini-3-flash-preview"
    mapping_path = Path("src/data/mapping.json")
    with open(mapping_path, "r") as f:
        mapping_data = json.load(f)["docs"]

    output_dir = Path("src/data/tables")
    output_dir.mkdir(parents=True, exist_ok=True)

    img_dir = Path("public/img")
    
    # Sort mapping by page number to determine ranges
    mapping_data.sort(key=lambda x: x["page"])

    for i, entry in enumerate(mapping_data):
        start_page = entry["page"]
        href = entry["href"]
        
        # Determine the end page for this section (start of next section)
        if i < len(mapping_data) - 1:
            end_page = mapping_data[i+1]["page"]
        else:
            end_page = 500 # Assuming max 500 pages

        print(f"\nChecking section {href} (Pages {start_page} to {end_page-1})...")
        
        # Collect all images in this page range
        section_images = []
        for p in range(start_page, end_page):
            # Glob for pX_ where X is exact page number
            # We use ^p{p}_ to avoid matching p420 when looking for p42
            found = list(img_dir.glob(f"p{p}_*"))
            section_images.extend(found)
        
        if not section_images:
            print(f"  -> No graphical diagrams found for this section range.")
            continue

        for img_path in section_images:
            # Check if we already processed this image
            output_filename = img_path.stem + "_data.json"
            if (output_dir / output_filename).exists():
                print(f"  -> Skipping {img_path.name} (already processed)")
                continue

            print(f"  -> Processing {img_path.name}...")
            
            with open(img_path, "rb") as f:
                image_bytes = f.read()

            prompt = f"""
            Identify and extract all data tables from this aircraft technical diagram.
            
            Association Metadata:
            - Source Page: {img_path.name.split('_')[0][1:]}
            - Document Section: {href}
            
            Output Requirements:
            1. Return a JSON object with a 'metadata' key containing the Source Page and Document Section.
            2. Return a 'tables' key containing an array of objects.
            3. Each table object must have a 'title', 'headers', and 'rows'.
            4. Keep units (kg, lb, m, in, ft) as part of the values.
            5. If there are weight variants (WV000, etc.), ensure they are key columns.
            """

            try:
                response = client.models.generate_content(
                    model=model_id,
                    contents=[
                        types.Part.from_bytes(data=image_bytes, mime_type="image/png"),
                        prompt
                    ],
                    config=types.GenerateContentConfig(
                        response_mime_type="application/json",
                        temperature=0.0
                    )
                )
                
                with open(output_dir / output_filename, "w") as out_f:
                    out_f.write(response.text)
                
                print(f"     [OK] Data saved to {output_filename}")
                
                # Small pause to avoid hitting rate limits
                import time
                time.sleep(1)

            except Exception as e:
                print(f"     [ERROR] Failed to process {img_path.name}: {e}")

if __name__ == "__main__":
    extract_tables_from_images()