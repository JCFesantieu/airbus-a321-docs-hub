import fitz  # PyMuPDF
import langextract as lx
import os
import json
from textwrap import dedent

def extract_with_langextract(pdf_path, output_dir, page_num=42):
    os.makedirs(output_dir, exist_ok=True)
    
    # 1. Extract text from the specific page using PyMuPDF
    doc = fitz.open(pdf_path)
    if page_num > len(doc):
        print(f"Error: Page {page_num} exceeds document length ({len(doc)})")
        return
        
    page = doc.load_page(page_num - 1) # 0-indexed
    text = page.get_text("text")
    
    print(f"--- Text from Page {page_num} ---\n{text[:500]}...\n")

    # 2. Define the extraction task
    prompt = dedent(
        """
        Extract aircraft weight variants and their characteristics.
        For each variant, identify:
        - Variant Name (e.g., WV000, WV002)
        - Max Ramp Weight (MRW)
        - Max Take-Off Weight (MTOW)
        - Max Landing Weight (MLW)
        - Max Zero Fuel Weight (MZFW)
        Use exact numerical values including units (kg and lb).
        """)

    # 3. Provide an example
    examples = [
        lx.data.ExampleData(
            text="WV000 83 400 kg (183 865 lb) 83 000 kg (182 984 lb) 73 500 kg (162 040 lb) 69 500 kg (153 221 lb)",
            extractions=[
                lx.data.Extraction(
                    extraction_class="weight_variant",
                    extraction_text="WV000",
                    attributes={
                        "mrw": "83 400 kg (183 865 lb)",
                        "mtow": "83 000 kg (182 984 lb)",
                        "mlw": "73 500 kg (162 040 lb)",
                        "mzfw": "69 500 kg (153 221 lb)"
                    },
                ),
            ],
        )
    ]

    # 4. Run the extraction using Vertex AI
    # Note: Requires gcloud authentication: gcloud auth application-default login
    project_id = os.getenv("GOOGLE_CLOUD_PROJECT", "sre-sandbox-340015")
    location = os.getenv("GOOGLE_CLOUD_LOCATION", "global")

    if not project_id:
        print("Error: GOOGLE_CLOUD_PROJECT environment variable is not set.")
        return

    try:
        # Vertex AI parameters must be passed in language_model_params for langextract.extract()
        result = lx.extract(
            text_or_documents=text,
            prompt_description=prompt,
            examples=examples,
            model_id="gemini-3-flash-preview", 
            language_model_params={
                "vertexai": True,
                "project": project_id,
                "location": location
            }
        )

        # 5. Save the results
        output_file = os.path.join(output_dir, f"page_{page_num}_extractions.json")
        
        # result.extractions is a list of Extraction objects
        serializable_extractions = []
        for ext in result.extractions:
            serializable_extractions.append({
                "class": ext.extraction_class,
                "text": ext.extraction_text,
                "attributes": ext.attributes
            })

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(serializable_extractions, f, indent=2)
            
        print(f"Extraction successful! Results saved to {output_file}")
        print(json.dumps(serializable_extractions, indent=2))

    except Exception as e:
        print(f"Extraction failed: {e}")
        print("\nNote: For Vertex AI, ensure you have run: gcloud auth application-default login")

if __name__ == "__main__":
    PDF_FILE = "input/Airbus-techdata-AC_A321_0322 (2) (1).pdf"
    EXPORT_DIR = "lang_export"
    
    if not os.path.exists(PDF_FILE):
        print(f"Error: {PDF_FILE} not found.")
    else:
        # Testing on page 42 which contains weight variant data
        extract_with_langextract(PDF_FILE, EXPORT_DIR, page_num=42)
