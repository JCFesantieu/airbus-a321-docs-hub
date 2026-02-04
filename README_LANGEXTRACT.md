# Airbus A321 Technical Data Extraction with LangExtract

This folder contains tools for extracting structured data from the A321 Technical Manual using [Google LangExtract](https://github.com/google/langextract).

## Overview

The `extract_lang.py` script leverages Google's Gemini models to transform unstructured text from the PDF into precise, grounded JSON data. It is optimized for technical documents with complex tables and specifications.

## Setup

### 1. Prerequisites
- Python 3.10+
- A Google Cloud Project with the **Vertex AI API** enabled.
- Google Cloud CLI (gcloud) installed and authenticated.

### 2. Environment Setup
Create a virtual environment and install the required dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install langextract pymupdf
```

## Usage with Vertex AI

LangExtract can be used with Vertex AI by leveraging your Google Cloud credentials.

### 1. Authentication
Ensure you are authenticated with your Google Cloud account:

```bash
gcloud auth application-default login
```

### 2. Configure the Script
Open `extract_lang.py` and ensure the `lx.extract` call is configured for Vertex AI. You will need to provide your Project ID and Location (e.g., `us-central1`).

```python
# Example configuration in extract_lang.py
result = lx.extract(
    text_or_documents=text,
    prompt_description=prompt,
    examples=examples,
    model_id="gemini-3-flash", # Or gemini-3-pro
    vertexai=True,
    project="YOUR_PROJECT_ID",
    location="us-central1"
)
```

### 3. Run the Extraction
Execute the script within the virtual environment:

```bash
source .venv/bin/activate
python3 extract_lang.py
```

## Output
Structured JSON files will be generated in the `lang_export/` directory. Each entry includes:
- **extraction_class**: The type of data (e.g., `weight_variant`).
- **extraction_text**: The exact text found in the source.
- **attributes**: A dictionary of structured fields (e.g., `mrw`, `mtow`).

## Customization
To extract different data types:
1. Update the `prompt` string in `extract_lang.py` to describe the new entities.
2. Update the `examples` list with 1-2 representative text snippets and their expected JSON output. This "few-shot" approach ensures high accuracy.
